import * as bcrypt from 'bcryptjs'

const roundsOfHashing = 10

export async function encryptData(data: string) {
  const hashedData = await bcrypt.hash(data, roundsOfHashing)

  return hashedData
}

export const compareEncryptValue = async (encrypted: string, value: string) => {
  return await bcrypt.compare(value, encrypted)
}
