import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
function ViewUser() {

    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await axios.get(
            `http://localhost:3001/users/${id}`
        );
        setUser(res.data);
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Email</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer">
                <div className="row">
                    {/* <div className="col-6">
                        <button className="btn btn-warning d-flex align-items-center justify-content-center gap-2">
                            <FaCheck /> Update
                        </button>
                    </div> */}
                    <div className="col-12 text-end">
                        <Link to="/" className="btn btn-dark d-inline-flex align-items-center gap-2">
                            <FaArrowLeft /> Back to List
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewUser;