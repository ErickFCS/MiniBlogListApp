const User = ({ user }) => {
    if (!user) return null
    return (
        <>
            <h2>{user.name}</h2>
            <h3>{user.username}</h3>
            <h4>added blogs</h4>
            <ul>
                {user.Blog.map((e, i) => (
                    <li key={i}>{e.title}</li>
                ))}
            </ul>
        </>
    )
}

export default User
