import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const DEFAULT_EXPIRES = 3600

function getR2Config() {
  const endpoint = process.env.R2_ENDPOINT
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucket = process.env.R2_BUCKET_NAME
  const publicBase = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, "")

  if (!endpoint || !accessKeyId || !secretAccessKey || !bucket) {
    return null
  }

  return { endpoint, accessKeyId, secretAccessKey, bucket, publicBase }
}

let client: S3Client | null = null

function getR2Client(config: NonNullable<ReturnType<typeof getR2Config>>) {
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    })
  }
  return client
}

/** Resolve an R2 object key to a URL (public base or short-lived presigned URL). */
export async function getR2ObjectUrl(
  key: string | null | undefined,
  expiresIn = DEFAULT_EXPIRES,
): Promise<string | null> {
  const trimmed = key?.trim()
  if (!trimmed) return null

  const config = getR2Config()
  if (!config) {
    console.error("[r2] Missing R2 env configuration")
    return null
  }

  if (config.publicBase) {
    return `${config.publicBase}/${trimmed.replace(/^\//, "")}`
  }

  try {
    const command = new GetObjectCommand({
      Bucket: config.bucket,
      Key: trimmed,
    })
    return await getSignedUrl(getR2Client(config), command, { expiresIn })
  } catch (err) {
    console.error("[r2] sign:", trimmed, err)
    return null
  }
}

export async function getR2ObjectUrls(
  keys: (string | null | undefined)[],
  expiresIn = DEFAULT_EXPIRES,
): Promise<(string | null)[]> {
  return Promise.all(keys.map((key) => getR2ObjectUrl(key, expiresIn)))
}
