export function convertIpfsHash(
  source: string,
  desiredGatewayPrefix: string = 'https://content.wrappr.wtf/ipfs/',
): string {
  return desiredGatewayPrefix + source
}

export function isIpfsUrl(url: string): boolean {
  return url.startsWith('ipfs://')
}

export function convertIpfsToGateway(url: string): string {
  return convertIpfsHash(url.replace('ipfs://', ''))
}
