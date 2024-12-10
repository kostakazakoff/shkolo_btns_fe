const origin = import.meta.env.VITE_API_BASE_URL

const Path = {
    HOME: '/',
    EDIT: '/edit',
    CLEAR: '/clear',
    ORIGIN: origin ? origin : 'http://localhost:8000'
}

export default Path;