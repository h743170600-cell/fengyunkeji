export interface OSSFile {
  name: string
  url: string
  lastModified: string
  size: number
  etag: string
}

export interface ListObjectsResult {
  objects: OSSFile[]
  prefixes: string[]
  isTruncated: boolean
  nextMarker: string
  res: any
}