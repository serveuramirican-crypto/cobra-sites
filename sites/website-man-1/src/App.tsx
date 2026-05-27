import siteData from './data/site-data.json'

interface Section {
  id: string; section_type: string; title: string;
  settings: Record<string, any>; is_visible: boolean; position: number;
}

function SectionRenderer({ section }: { section: Section }) {
  const s = section.settings || {}
  switch (section.section_type) {
    case 'hero': case 'hero-ff': case 'hero-pro':
      return (
        <div className="relative min-h-[70vh] flex items-center justify-center text-white overflow-hidden"
          style={{ background: s.backgroundColor || s.bgColor || 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
          {s.backgroundImage && <img src={s.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{s.title || s.heading || siteData.theme.name}</h1>
            {s.subtitle && <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">{s.subtitle}</p>}
            {s.buttonText && <a href={s.buttonLink || '#'} className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all">{s.buttonText}</a>}
          </div>
        </div>
      )
    case 'banner': case 'scrolling-banner':
      return (
        <div className="py-16 px-6 text-center" style={{ background: s.backgroundColor || '#f8fafc' }}>
          {s.image && <img src={s.image} alt="" className="max-w-full mx-auto rounded-2xl" />}
          <h2 className="text-3xl font-bold mt-6">{s.title || s.heading || ''}</h2>
          {s.description && <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{s.description}</p>}
        </div>
      )
    case 'text':
      return (
        <div className="py-16 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{s.title || s.heading || ''}</h2>
          <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content || s.text || '' }} />
        </div>
      )
    case 'gallery':
      return (
        <div className="py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-10">{s.title || 'Gallery'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {(s.images || []).map((img: string, i: number) => (
              <img key={i} src={img} alt="" className="w-full h-64 object-cover rounded-xl" />
            ))}
          </div>
        </div>
      )
    case 'contact':
      return (
        <div className="py-16 px-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">{s.title || 'Contact'}</h2>
          <div className="space-y-4">
            {s.email && <p className="text-center text-gray-700">Email: {s.email}</p>}
            {s.phone && <p className="text-center text-gray-700">Téléphone: {s.phone}</p>}
            {s.address && <p className="text-center text-gray-700">{s.address}</p>}
          </div>
        </div>
      )
    case 'product_list': case 'product-list': case 'featured_products':
    case 'featured_product_v3': case 'featured-product':
    case 'product_recommendations': case 'featured_collections':
      const products = siteData.products || []
      return (
        <div className="py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-10">{s.title || 'Products'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {products.slice(0, s.limit || 8).map((product: any) => (
              <div key={product.id} className="group">
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-3">
                  {product.image_url && <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                </div>
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-gray-600 font-bold mt-1">{product.price} DH</p>
              </div>
            ))}
          </div>
        </div>
      )
    default:
      return (
        <div className="py-12 px-6 max-w-4xl mx-auto">
          {s.title && <h2 className="text-2xl font-bold mb-4">{s.title}</h2>}
          {s.description && <p className="text-gray-600">{s.description}</p>}
          {s.image && <img src={s.image} alt="" className="mt-6 rounded-xl max-w-full" />}
          {s.backgroundImage && !s.image && <img src={s.backgroundImage} alt="" className="mt-6 rounded-xl max-w-full" />}
          {s.content && <div className="text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html: s.content }} />}
        </div>
      )
  }
}

export default function App() {
  const sections = (siteData.sections as Section[])
    .filter((s) => s.is_visible)
    .sort((a, b) => a.position - b.position)
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-black text-xl tracking-tight">{siteData.theme.name}</h1>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="/" className="hover:text-black transition-colors">Accueil</a>
            <a href="#products" className="hover:text-black transition-colors">Produits</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </nav>
        </div>
      </header>
      <main>{sections.map((section) => <SectionRenderer key={section.id} section={section} />)}</main>
      <footer className="bg-gray-950 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-bold text-lg mb-2">{siteData.theme.name}</h2>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} {siteData.theme.name}. All rights reserved.</p>
          <p className="text-gray-600 text-xs mt-4">Built with COBRA</p>
        </div>
      </footer>
    </div>
  )
}