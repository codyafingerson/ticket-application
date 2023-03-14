import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";

import MainContainer from "../components/shared/MainContainer";

function CreateUser() {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const isAdmin = e.target.isAdmin.checked;
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const username = e.target.username.value;
        const password = e.target.password.value;

        dispatch(registerUser({ isAdmin, firstName, lastName, username, password }));
    }


  return (
    <MainContainer>
        <h1>Create User</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="isAdmin">Is this user an admin?</label>
                <input type="checkbox" name="isAdmin" id="isAdmin" />
            </div>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <button type="submit">Create User</button>
        </form>
    </MainContainer>
  )
}
export default CreateUser