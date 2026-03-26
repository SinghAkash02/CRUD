import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

function Home() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const res = await axios.get(
            "http://localhost:3001/users"
        );
        setUsers(res.data);
    };

    // const deleteUser = (id) => {

    //     Swal.fire({
    //         title: "Are you sure?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#d33",
    //         cancelButtonColor: "#000",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then(async (result) => {

    //         if (result.isConfirmed) {

    //             // delete
    //             await axios.delete(
    //                 `http://localhost:3001/users/${id}`
    //             );


    //             // get fresh users
    //             const res = await axios.get(
    //                 "http://localhost:3001/users"
    //             );

    //             let users = res.data;

    //             // sort
    //             users.sort(
    //                 (a, b) => Number(a.id) - Number(b.id)
    //             );


    //             // ✅ create new array with correct userId
    //             const updatedUsers = users.map(
    //                 (u, index) => ({
    //                     ...u,
    //                     userId: index + 1
    //                 })
    //             );


    //             // ✅ update one by one safely
    //             for (const u of updatedUsers) {

    //                 await axios.patch(
    //                     `http://localhost:3001/users/${u.id}`,
    //                     {
    //                         userId: u.userId
    //                     }
    //                 );

    //             }


    //             Swal.fire(
    //                 "Deleted!",
    //                 "User deleted",
    //                 "success"
    //             );


    //             loadUsers();

    //         }

    //     });

    // };

    const deleteUser = (id) => {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#000",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {

            if (result.isConfirmed) {

                await axios.delete(
                    `http://localhost:3001/users/${id}`
                );

                Swal.fire(
                    "Deleted!",
                    "User deleted",
                    "success"
                );

                loadUsers();   // ✅ only reload

            }

        });

    };
    return(

        <div className="card shadow">

            <div className="card-header d-flex justify-content-between">

                <h4>User List</h4>

                <Link to="/add" className="btn btn-success">
                    <FaPlus /> Add User
                </Link>

            </div>

            <div className="card-body">

                <div className="table-responsive">
                    <table className="table table-striped table-hover">

                        <thead className="table-dark">

                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {users.map((u) => (

                                <tr key={u.id}>

                                    <td>{u.userId}</td>
                                    <td>{u.email}</td>
                                    <td>{u.username}</td>

                                    <td>

                                        <Link
                                            to={`/view/${u.id}`}
                                            className="btn btn-info btn-sm me-2 mt-1"
                                        >
                                            <FaEye />
                                        </Link>

                                        <Link
                                            to={`/edit/${u.id}`}
                                            className="btn btn-warning btn-sm me-2 mt-1"
                                        >
                                            <FaEdit />
                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm mt-1"
                                            onClick={() => deleteUser(u.id)}
                                        >
                                            <FaTrash />
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>

            </div>

        </div>

    );
}

export default Home;