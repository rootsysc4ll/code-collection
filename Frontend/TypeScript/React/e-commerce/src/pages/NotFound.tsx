import Header from "../components/Header"

export default function NotFound() {
    return (<>
        <Header />

        <span style={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold'
        }}>
            Error 404(Not Found)
        </span>
    </>)
}