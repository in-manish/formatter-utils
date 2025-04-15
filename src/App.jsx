import FormatterInput from './components/FormatterInput'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          JSON & Python Dict Formatter
        </h1>
        <FormatterInput />
      </div>
    </div>
  )
}

export default App
