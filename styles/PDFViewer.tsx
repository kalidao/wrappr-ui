export default function PDFViewer({ src }: { src: string }) {
  return (
    <div className="w-full">
      <iframe src={src} width="100%" height="500px"></iframe>
    </div>
  )
}
