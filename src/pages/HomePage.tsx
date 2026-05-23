import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="py-8 sm:py-12 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#3B6D11] bg-[#EAF3DE] border border-[#C0DD97] px-3 py-1 rounded-full mb-5">
          ✨ かんたん・すぐできる
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-800 leading-snug mb-3">
          あなたの<span className="text-[#3B6D11]">履歴書</span>を<br />Web でつくろう
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-7">
          フォームに入力するだけで、きれいな履歴書が完成。<br />
          そのままPDFで保存できます。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <Link to="/build" className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#3B6D11] text-[#EAF3DE] text-sm font-medium px-5 py-3 sm:py-2.5 rounded-lg">
            ✏️ 作成をはじめる
          </Link>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white text-gray-700 text-sm px-5 py-3 sm:py-2.5 rounded-lg border border-gray-200">
            👁️ サンプルを見る
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-8">
        {[
          { icon: '📝', label: 'かんたん入力', desc: '必要な項目をフォームに入力するだけで自動レイアウト', bg: 'bg-[#EAF3DE]' },
          { icon: '👁️', label: 'リアルタイムプレビュー', desc: '入力しながら仕上がりをその場で確認できます', bg: 'bg-[#E1F5EE]' },
          { icon: '📥', label: 'PDF出力', desc: '完成したらPDFでダウンロード。印刷にも対応', bg: 'bg-[#E6F1FB]' },
        ].map(({ icon, label, desc, bg }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-xl p-5">
            <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3 text-lg`}>
              {icon}
            </div>
            <h3 className="text-[13px] font-medium text-gray-800 mb-1">{label}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
