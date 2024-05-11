
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

export default function Skills() {

  const [skills, setSkills] = useState([
    {
        _id: '1',
        name: "React",
    },
    {
        _id: '2',
        name: "Node",
    },
    {
        _id: '3',
        name: "MongoDB",
    },
    {
        _id: '4',
        name: "Express",
    }
  ])

  async function deleteSkill(skillId: String) {
    try {
        // Delete skill from the server
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/skills/${skillId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete skill");
        }

        // Optionally, handle response from the server
        const data = await response.json();
        console.log(data);

        
        // Update the skills array
        setSkills(prevSkills => prevSkills.filter(skill => skill._id !== skillId));
    }
    catch (error) {
        console.error("Error deleting skill:", error);
        // Handle error (e.g., show error message to the user)
    }


  }


  return (
    <>
      {skills.map((skill, index) => (
          <div key={skill._id} className="skills">
            <h5 className="f-w-600">{skill.name}</h5>
            <button onClick={(() => deleteSkill(skill._id))}>
              <ClearIcon className="clear-icon" style={{ color: "red" }} />
            </button>
          </div>
      ))}
    </>
  );
}
