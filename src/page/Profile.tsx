import Navbar from "../layout/Navbar";
import { userDataState } from "../atoms/userDataState";
import { useRecoilState } from "recoil";
import "../css/Profile.css";
import Skills from "../components/Skills";
import PrevWork from "../components/PrevWork";
import Bio from "../components/Bio";

export default function Profile() {
  const [userData, setUserData] = useRecoilState(userDataState);


  const getUserData = async () => {
    try {
      // Fetch user data from the server
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/freelancer/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      // Optionally, handle response from the server
      const data = await response.json();

      // Update user data in the Recoil atom
      setUserData({
        email: data.email,
        authToken: localStorage.getItem("Authorization") || "",
        bio: data.bio,
        title: data.title,
        rate: data.rate,
        loggedIn: true,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error (e.g., show error message to the user)
    }
  };
  getUserData();

  return (
    <>
      <Navbar />

      <div className="container justify-content-center align-items-center vh-100">
        <div className="page-content page-container" id="page-content">
          <div className="padding">
            <div className="row container d-flex justify-content-center">
              <div className="col-xl-6 col-md-12">
                <div className="card user-card-full">
                  <div className="col m-l-0 m-r-0">
                    <div className="col-sm-4 bg-c-lite-green user-profile">
                      <div className="card-block text-center text-white">
                        <div className="m-b-25">
                          <img
                            src="https://img.icons8.com/bubbles/100/000000/user.png"
                            className="img-radius"
                            alt="User-Profile-Image"
                          />
                        </div>
                        <h4 className="f-w-600">{userData.email}</h4>
                        <p>Web Designer</p>
                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card-block w-100">
                        <Bio />
                        <h3 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Previous work
                        </h3>
                        <hr  />
                        <PrevWork />
                        <h3 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Skills
                        </h3>
                        <hr />
                        <div className="skill-container">
                            <Skills />
                        </div>
                        <ul className="social-link list-unstyled m-t-40 m-b-10">
                          <li>
                            <a
                              href="#!"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title=""
                              data-original-title="facebook"
                              data-abc="true"
                            >
                              <i
                                className="mdi mdi-facebook feather icon-facebook facebook"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#!"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title=""
                              data-original-title="twitter"
                              data-abc="true"
                            >
                              <i
                                className="mdi mdi-twitter feather icon-twitter twitter"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#!"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title=""
                              data-original-title="instagram"
                              data-abc="true"
                            >
                              <i
                                className="mdi mdi-instagram feather icon-instagram instagram"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
