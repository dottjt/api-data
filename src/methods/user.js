const knex = require('../db/knex');
const jsonwebtoken = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const createUser = (provider, profile) => {
  const id = uuidv4();

  switch(provider) {
    case 'google': {
      return {
        newUser: { 
          id, 
          email: profile.emails[0].value, 
          display_name: profile.name.givenName, 
          avatar: profile.photos[0].value ? (
            setGoogleAvatarSize(profile.photos[0].value, 32) ||
            setGoogleAvatarSize(profile.photos[0].value, 64) ||
            setGoogleAvatarSize(profile.photos[0].value, 184)
          ) : ''
        },
        newUserProvider: { provider, user_id: id, id: profile.id }
      }
    }
    case 'discord': {
      return {
        newUser: { 
          id, 
          display_name: profile.username, 
          email: profile.email,
          avatar: getDiscordAvatarFromProfile(profile),
        },
        newUserProvider: { provider, user_id: id, id: profile.id },
      }
    }
    default: throw new Error(`${provider} unknown.`);
  }
};

const updateAvatar = (user, provider, profile) => {
  switch(provider) {
    case 'google': {
      if (profile.photos[0].value && user.avatar !== setGoogleAvatarSize(profile.photos[0].value, 32)) {
        return setGoogleAvatarSize(profile.photos[0].value, 32) ||
          setGoogleAvatarSize(profile.photos[0].value, 64) ||
          setGoogleAvatarSize(profile.photos[0].value, 184) ||
          '';
      }
      return false;
    }
    case 'discord': {
      const avatar = getDiscordAvatarFromProfile(profile);
      if (avatar && user.avatar !== avatar) { 
        return avatar;
      }
      return false;
    }
    default: return false;
  }
};

const generateAuthToken = (user) => {
  const token = jsonwebtoken
    .sign(
      {
        id: user.id.toHexString(),
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
};

const getDiscordAvatarFromProfile = (profile) => {
  if (!profile.avatar) return null
  const baseUrl = 'https://cdn.discordapp.com/'
  const format = '.png'
  const endpoint = `avatars/${profile.id}/${profile.avatar}`

  return baseUrl + endpoint + format;
};

const setGoogleAvatarSize = (avatarUrl, size) => {
  if (!avatarUrl) return null
  const baseUrl = avatarUrl.split('?')[0]
  return baseUrl + `?sz=${size}`
};

const findOrCreate = async (email, id, provider, profile) => {
  try {
    let user;

    if (email)  {
      user = await knex('user').where('email', email).select();
    }

    if (user) {
      const avatar = updateAvatar(user, provider, profile);
      if (avatar) {
        user = await knex('user').where(id, user.id).update({ avatar }).returning('*');
      }
    }

    if (!user) {
      const { newUser, newUserProvider } = createUser(provider,profile);

      user = await knex('user').insert(newUser).returning('id');
      await knex('user_provider').insert(newUserProvider);
      console.log(`created new ${newUserProvider.provider} user: ${user.username}`);
    }

    const token = generateAuthToken(user);
    return { user, token }
  } catch (e) {
    return Promise.reject(new Error(e))
  }
};

module.exports = {
  findOrCreate,
};
