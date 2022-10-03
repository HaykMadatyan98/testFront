import './user.css';

function User({ data }) {
    return (
        <div key={data.id} className="User">
            <span>{data.id}</span>
            <span>{data.firstname} {data.lastname}</span>
        </div>
    );
}

export default User;
