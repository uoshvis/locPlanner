import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

function Home() {
    const { userInfo } = useSelector((state) => state.auth)

    return (
        <div>
            <main>
                <h2>Welcome {userInfo?.firstName}!</h2>

                <p>You can view this page because you're logged in</p>

                <p>Todays review: event names: location</p>
                <p>You can do this, I believe in you.</p>
            </main>
            <nav>
                <Link to="/calendar">View Full Calendar</Link>
            </nav>
        </div>
    )
}

export default Home
