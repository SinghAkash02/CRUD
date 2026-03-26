import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
function AddUser() {

    const nav = useNavigate();

    const [user, setUser] = useState({
        email: "",
        username: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    //Genrate random string id's because of fake server json
    const saveUser1 = async (e) => {
        e.preventDefault();

        await axios.post(
            "http://localhost:3001/users",
            user
        );

        nav("/");
    };

    //npm install json-server@0.17.4 - Install this version for perform id numbering 
    const saveUser = async (e) => {
        e.preventDefault();

        // validation

        if (!user.email || !user.username) {
            Swal.fire({
                icon: "error",
                text: "All fields are required",
                // text: "Please enter valid email",
                customClass: {
                    confirmButton: "btn btn-dark"
                }

            });
            return;
        }

        // email format check
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(user.email)) {
            Swal.fire({
                icon: "error",
                text: "Please enter a valid email address. (abc@gmail.com)",
                customClass: {
                    confirmButton: "btn btn-dark"
                }
            });
            return;
        }


        // get all users
        const res = await axios.get(
            "http://localhost:3001/users"
        );

        const users = res.data;

        // duplicate email check
        const exists = users.some(
            (u) =>
                u.email.toLowerCase() ===
                user.email.toLowerCase()
        );

        if (exists) {
            Swal.fire({
                icon: "warning",
                text: "This email already exists",
                customClass: {
                    confirmButton: "btn btn-dark"
                }

            });
            return;
        }

        // generate next id
        const nextId =
            users.length > 0
                ? Math.max(...users.map(u => Number(u.userId))) + 1
                : 1;

        const newUser = {
            userId: nextId,
            email: user.email,
            username: user.username,
        };

        await axios.post(
            "http://localhost:3001/users",
            newUser
        );

        Swal.fire({
            icon: "success",
            text: "User added successfully",
            customClass: {
                confirmButton: "btn btn-dark"
            }
        });

        nav("/");
    };

    return (
        // style={{ width: "50%", margin:"auto" }}
        <div className="col-12 col-md-6 col-lg-6 m-auto">
            <form onSubmit={saveUser}>
                <div className="card" >
                    <div className="card-header">
                        <h4 className="card-title">Add User</h4>
                    </div>
                    {/* <img src="..." className="card-img-top" alt="..."> */}
                    <div className="card-body">
                        <input
                            name="email"
                            placeholder="Email*"
                            onChange={handleChange}
                            className="form-control mb-2"
                        />

                        <input
                            name="username"
                            placeholder="Username*"
                            onChange={handleChange}
                            className="form-control mb-2"
                        />
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-success d-flex align-items-center justify-content-center gap-2">
                                    <FaSave /> Save
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
            </form>
        </div>
    );
}

export default AddUser;