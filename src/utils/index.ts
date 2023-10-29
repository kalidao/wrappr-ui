import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { isValidURL } from './isValidURL'
import { uploadFile } from './uploadFile'
import { uploadJSON } from './uploadJSON'
import { uploadBlob } from './uploadBlob'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { isValidURL, uploadFile, uploadJSON, uploadBlob, cn }
