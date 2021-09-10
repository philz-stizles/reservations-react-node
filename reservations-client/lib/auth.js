import { genSalt, hash, compare } from 'bcryptjs'

export const hashPasswordAsync = async (value) => {
  const salt = await genSalt(12)
  return await hash(value, salt)
}

export const verifyPasswordAsync = async (value, hashedPassword) => {
  return await compare(value, hashedPassword)
}
