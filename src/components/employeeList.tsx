import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LogoutProps {
  onLogout: () => void;
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  reportingTo: string;
}

function EmployeeList({ onLogout }: LogoutProps) {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const goToAddEmployee = () => {
    navigate("/addemployee");
  };
  const goToTodoList = () => {
    navigate("/todos"); 
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get<Employee[]>("http://localhost:8000/employees");
        setEmployees(response.data);
      } 
      catch (err: any) {
        setError(err.message || "Failed to fetch employees");
      } 
      finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <button onClick={goToAddEmployee}>Add Employee</button>
      <button onClick={goToTodoList}>Todo</button>
      <button onClick={onLogout}>Logout</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              <strong>
                {employee.id} - {employee.firstName}
              </strong>{" "}
              - {employee.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeList;
