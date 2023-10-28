import { siteConfig } from '@/config/siteConfig'

export default function Header() {
  return (
    <footer className="max-h-10vh p-6 flex items-center justify-between">
      <p className="text-secondary">
        Made with ♡ by <a href={siteConfig.links.twitter}>KaliCo</a>.
      </p>
      <div className="flex items-center justify-center space-x-3">
        <a href={siteConfig.links.tos} target="_blank" rel="noopenner noreferrer">
          Terms
        </a>
        <a href={siteConfig.links.privacy} target="_blank" rel="noopenner noreferrer">
          Privacy Policy
        </a>
      </div>
    </footer>
  )
}
