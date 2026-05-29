export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-4 sm:px-8 py-4 flex justify-center">
      <p className="text-xs text-gray-400">
        © {new Date().getFullYear()} 履歴書ビルダー
      </p>
    </footer>
  )
}