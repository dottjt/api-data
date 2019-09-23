import mongoose from 'mongoose'
import validator from 'validator'
import jsonwebtoken from 'jsonwebtoken'
import {
  getDiscordAvatarFromProfile,
  setGoogleAvatarSize,
} from './../utils/schemas/generators'

// USER
// schema

const findOrCreate = async (email, id, provider, profile) => {
  try {
    let user;

    if (email)  {
      user = await knex('').where('email', email).select();
    }

    if (user) {
      try {
        const avatar = updateAvatar(user, provider, profile);
        user = await knex('user').where(id, user.id).update({ avatar }).returning('*');
      } catch (e) {
        Promise.reject(new Error(e))
      }
    }

    if (!user) {
      const { newUser, newUserProvider } = createUser(provider,profile);

      user = await knex('user').insert(newUser).returning('id');
      await knex('user_provider').insert(newUserProvider);
      console.log(`created new ${newUserProvider.provider} user: ${user.username}`);
    }

    const token = user.generateAuthToken()
    return { user, token }
  } catch (e) {
    return Promise.reject(new Error(e))
  }
};

const createUser = (provider, profile) => {
  let newUser;
  let newUserProvider;

  const id = uuidv4();

  if (provider === 'google') {
    newUser = {
      id,
      email: profile.emails[0].value,
      display_name: profile.name.givenName,
    };
    newUserProvider = {
      provider,
      user_id: id,
      id: profile.id,
    };
    if (profile.photos[0].value) {
      newUser.avatar =
        setGoogleAvatarSize(profile.photos[0].value, 32) ||
        setGoogleAvatarSize(profile.photos[0].value, 64) ||
        setGoogleAvatarSize(profile.photos[0].value, 184);
    }
  } else if (provider === 'discord') {
    const avatar = getDiscordAvatarFromProfile(profile)
    newUser = {
      id,
      username: profile.username,
      email: profile.email,
    }
    newUserProvider = {
      provider,
      user_id: id,
      id: profile.id,
    };
    if (avatar) {
      newUser.avatar = avatar;
    }
  }

  return {
    newUser,
    newUserProvider,
  }
};

const updateAvatar = (user, provider, profile) => {
  if (provider === 'google') {
    if (profile.photos[0].value && user.avatar.small !== setGoogleAvatarSize(profile.photos[0].value, 32)) {
      const avatar =
        setGoogleAvatarSize(profile.photos[0].value, 32) ||
        setGoogleAvatarSize(profile.photos[0].value, 64) ||
        setGoogleAvatarSize(profile.photos[0].value, 184);

    }
    return user;
  }
  if (provider === 'discord') {
    const avatar = getDiscordAvatarFromProfile(profile)
    if (avatar && user.avatar !== avatar) {
      try {
        const updatedUser = await knex('user').where(id, user.id).update({ avatar }).returning('*');
        return updatedUser;
      } catch (e) {
        Promise.reject(new Error(e))
      }
    }
    return user;
  }
  return user;
};

const generateAuthToken = () => {
  const user = this.toObj()

  const token = jsonwebtoken
    .sign(
      {
        id: user._id.toHexString(),
        admin: !!user.admin,
        moderator: !!user.moderator,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
      }
    )
    .toString()
  return token
},



// model methods
UserSchema.statics = {

  createUser (provider, profile) {
    const newUser = this.newUserObj(provider, profile)
    const user = new User(newUser)
    return user.save()
  },
  async findOrCreate (email, id, provider, profile) {
    try {
      let user
      if (email) user = await this.findByEmail(email)
      if (!user) user = await this.findByExternalID(provider, id)
      if (user) user = await this.updateAvatar(user, provider, profile)
      if (!user) {
        user = await this.createUser(provider, profile)
        console.log(`created new ${provider} user: ${user.username}`)
      }
      const token = user.generateAuthToken()
      return { user, token }
    } catch (e) {
      return Promise.reject(new Error(e))
    }
  },

}

// instance methods
UserSchema.methods = {
  toObj () {
    const userObj = this.toObject()
    return userObj
  },

}

function getDiscordAvatarFromProfile(profile) {
  if (!profile.avatar) return null
  const baseUrl = 'https://cdn.discordapp.com/'
  const format = '.png'
  const endpoint = `avatars/${profile.id}/${profile.avatar}`

  return baseUrl + endpoint + format
}

function setGoogleAvatarSize(avatarUrl, size) {
  if (!avatarUrl) return null
  const baseUrl = avatarUrl.split('?')[0]
  return baseUrl + `?sz=${size}`
}
