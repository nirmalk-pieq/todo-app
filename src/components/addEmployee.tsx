import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface LogoutProps {
  onLogout: () => void;
}

interface EmployeeAdd {
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  reportingTo?: string;
}

function AddEmployee({ onLogout }: LogoutProps) {

  const [formData, setFormData] = useState<EmployeeAdd>({
    firstName: "",
    lastName: "",
    role: "",
    department: "",
    reportingTo: "",
  });

  const initialFormData: EmployeeAdd = {
    firstName: "",
    lastName: "",
    role: "",
    department: "",
    reportingTo: "",
    };


  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const viewEmployee = () => {
    navigate("/employees"); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:8000/employees/addEmployee", 
        formData, {
        headers: {
        "Content-Type": "application/json",
        },
    });

    console.log("Employee adding response:", response);

      setSuccessMessage(`${formData.firstName} added successfully. Employee ID: ${response.data.id}`);
    //   setFormData({
    //     firstName: "",
    //     lastName: "",
    //     role: "",
    //     department: "",
    //     reportingTo: "",
    //   });
      setFormData(initialFormData);
    } catch (err: any) {
        console.log("Error details:", err.response);
        const backendMessage = err.response.data?.message || JSON.stringify(err.response.data);
        console.error("Error details:", backendMessage);
      setError(err.error || "Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          disabled={loading}
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="reportingTo"
          placeholder="Reporting To (Optional)"
          value={formData.reportingTo}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={viewEmployee}>("/employees") View Employee List</button>
      <button onClick={() => navigate("/todos")}>Todo</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default AddEmployee;
