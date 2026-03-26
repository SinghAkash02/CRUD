import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";
function EditUser() {

    const { id } = useParams();
    const nav = useNavigate();

    const [user, setUser] = useState({
        email: "",
        username: "",
    });

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await axios.get(
            `http://localhost:3001/users/${id}`
        );
        setUser(res.data);
    };

    const update_old = async (e) => {
        e.preventDefault();

        await axios.put(
            `http://localhost:3001/users/${id}`,
            user
        );

        nav("/");
    };

    const update = async (e) => {
        e.preventDefault();

        // empty validation
        if (!user.email || !user.username) {

            Swal.fire({
                icon: "error",
                title: "Missing Fields",
                text: "Please fill all fields",
                customClass: {
                    confirmButton: "btn btn-dark"
                }
            });

            return;
        }

        // email format validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(user.email)) {

            Swal.fire({
                icon: "error",
                title: "Invalid Email",
                text: "Enter valid email",
                customClass: {
                    confirmButton: "btn btn-dark"
                }
            });

            return;
        }

        // get users
        const res = await axios.get(
            "http://localhost:3001/users"
        );

        const users = res.data;

        // duplicate check except current id
        const exists = users.some(
            (u) =>
                u.email.toLowerCase() ===
                user.email.toLowerCase() &&
                Number(u.id) !== Number(id)
        );

        if (exists) {

            Swal.fire({
                icon: "warning",
                title: "Duplicate Email",
                text: "Email already exists",
                customClass: {
                    confirmButton: "btn btn-dark"
                }
            });

            return;
        }

        // update API
        await axios.put(
            `http://localhost:3001/users/${id}`,
            user
        );

        Swal.fire({
            icon: "success",
            text: "User updated successfully",
            customClass: {
                confirmButton: "btn btn-dark"
            }
        });

        nav("/");
    };

    return (
        <form onSubmit={update}>
            <div className="col-12 col-md-6 col-lg-6 m-auto">
                <div className="card" >
                    <div className="card-header">
                        <h4 className="card-title">Edit User</h4>
                    </div>
                    <div className="card-body">
                        <input
                            name="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    email: e.target.value,
                                })
                            }
                            className="form-control mb-2"
                        />

                        <input
                            name="username"
                            value={user.username}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    username: e.target.value,
                                })
                            }
                            className="form-control mb-2"
                        />
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-warning d-flex align-items-center justify-content-center gap-2">
                                    <FaCheck /> Update
                                </button>
                            </div>
                            <div className="col-6 text-end">
                                <Link to="/" className="btn btn-dark d-inline-flex align-items-center gap-2">
                                    <FaArrowLeft /> Back to List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default EditUser;