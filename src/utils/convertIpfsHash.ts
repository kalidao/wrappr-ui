export function convertIpfsHash(
  source: string,
  desiredGatewayPrefix: string = 'https://content.wrappr.wtf/ipfs/',
): string {
  return desiredGatewayPrefix + source
}
