import React from 'react';
const API_URL = 'http://localhost:5000/api';
const { useState, useRef, useEffect } = React;

// ============================================================
// 1. INITIAL DATA
// ============================================================

const INITIAL_TUTORS = [
  {
    id: "TUTOR001",
    name: "Thamba. J",
    password: "12345678",
    isFirstLogin: true,
    email: "tutor@nec.edu",
  },
];

const INITIAL_STUDENTS = [
  {
    id: 1,
    name: "Jeeviga M",
    regNo: "25104043",
    dept: "CSE",
    year: "1st",
    cgpa: "9.0",
    phone: "9876543210",
    email: "jeeviga@nec.edu.in",
    dob: "2005-06-15",
    photo: null,
    status: "Active",
    fatherName: "Muthuraman",
    fatherPhone: "9988776655",
    motherName: "Gomathi",
    motherPhone: "9988776644",
    address: "Kovilpatti, Tamil Nadu",
    password: "student123",
    isFirstLogin: false,
    onlineCoursesList: [
      { id: 1, name: "React Basics", status: "Completed" },
      { id: 2, name: "Node.js", status: "In Progress" },
    ],
    skillRackMedals: 944,
    skillRackProfile: "",
    additionalInfo: [],
    academics: [
      {
        id: 1,
        code: "23SH11C",
        name: "Heritage of Tamils",
        instructor: "Dr. S. Chithra",
        credits: 1,
        coTest: 0,
        cat1: 100,
        cat2: 0,
        endSem: 100,
        grade: "O",
        date: new Date().toLocaleString(),
      },
      {
        id: 2,
        code: "23SH12C",
        name: "Mathematical Foundations for Engineers",
        instructor: "Dr. R. Geetha",
        credits: 4,
        coTest: 84,
        cat1: 94,
        cat2: 90,
        endSem: 93,
        grade: "A+",
        date: new Date().toLocaleString(),
      },
    ],
  },
  {
    id: 2,
    name: "Arjun Ramesh",
    regNo: "CS2021001",
    dept: "CSE",
    year: "3rd",
    cgpa: "8.7",
    phone: "9876543210",
    email: "arjun@nec.edu.in",
    dob: "2002-04-12",
    photo: null,
    status: "Active",
    fatherName: "Ramesh",
    fatherPhone: "9988776655",
    motherName: "Lakshmi",
    motherPhone: "9988776644",
    address: "Chennai",
    password: "student123",
    isFirstLogin: false,
    onlineCoursesList: [],
    skillRackMedals: 700,
    skillRackProfile: "",
    additionalInfo: [],
    academics: [],
  },
];

const INITIAL_MODULES = [
  {
    id: 1,
    name: "First Semester Courses",
    icon: "📚",
    type: "form",
    fields: [
      { id: "f1", label: "Course Name", type: "text" },
      { id: "f2", label: "Marks Obtained", type: "number" },
      {
        id: "f3",
        label: "Grade",
        type: "select",
        options: ["S", "A", "B", "C", "D", "E", "F"],
      },
    ],
  },
  {
    id: 2,
    name: "Second Semester Courses",
    icon: "📖",
    type: "table",
    columns: [
      { id: "col1", label: "Course Name", type: "text" },
      { id: "col2", label: "Marks", type: "number" },
      {
        id: "col3",
        label: "Grade",
        type: "select",
        options: ["S", "A", "B", "C", "D", "E", "F"],
      },
    ],
  },
];

const INITIAL_TIMETABLE = {
  1: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    timeSlots: [
      "07:00-08:00",
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
    ],
    data: {},
  },
};

const INITIAL_ATTENDANCE = {
  1: {
    August: { attended: 56, conducted: 56, percentage: 100 },
    September: { attended: 140, conducted: 140, percentage: 100 },
  },
};

const INITIAL_ACTIVITIES = {
  1: [
    {
      id: 1,
      type: "Intra College",
      venue: "NEC",
      title: "Poster Competition",
      date: "08-11-2025",
      achievement: "Third Place",
    },
  ],
};

const INITIAL_CERTIFICATIONS = {
  1: [
    {
      id: 1,
      name: "Python Programming",
      duration: "6 Weeks",
      institute: "Coursera",
      remarks: "Completed",
    },
  ],
};

const INITIAL_SKILLS = {
  1: { skillRackMedals: 944, onlineCourses: 5 },
};

const INITIAL_MODULE_DATA = {};

const genId = () => Date.now() + Math.random().toString(36).substr(2, 6);

// Grade to grade point mapping
const gradeToPoint = (grade) => {
  const map = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    D: 4,
    E: 3,
    F: 0,
  };
  return map[grade] !== undefined ? map[grade] : 0;
};

// Helper to calculate CGPA from academics array (two decimals)
const calculateCGPAFromAcademics = (courses) => {
  let totalCredits = 0;
  let weightedSum = 0;
  courses.forEach((c) => {
    const credits = parseFloat(c.credits) || 0;
    const gradePoint = gradeToPoint(c.grade);
    totalCredits += credits;
    weightedSum += credits * gradePoint;
  });
  if (totalCredits === 0) return "0.00";
  const cgpa = weightedSum / totalCredits;
  return cgpa.toFixed(2);
};

// ============================================================
// 2. HELPER FUNCTIONS & COMPONENTS
// ============================================================

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const AVATAR_COLORS = [
  "#4361ee",
  "#7209b7",
  "#f72585",
  "#3a0ca3",
  "#4cc9f0",
  "#06d6a0",
  "#fb8500",
  "#ef233c",
];
const getColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          width: "90%",
          maxWidth: 800,
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <h3 style={{ marginBottom: 20 }}>{title}</h3>
        {children}
      </div>
    </div>
  );
};

const ChangePasswordModal = ({ onClose, onSave, isFirstLogin = false }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    onSave(newPassword);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          width: "90%",
          maxWidth: 400,
        }}
      >
        <h3>
          {isFirstLogin ? "Welcome! Set Your New Password" : "Change Password"}
        </h3>
        {isFirstLogin && (
          <div
            style={{
              background: "#fb850020",
              color: "#fb8500",
              padding: 10,
              borderRadius: 8,
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            ⚠️ First login! Please set a new password.
          </div>
        )}
        {error && (
          <div
            style={{
              background: "#ef233c20",
              color: "#ef233c",
              padding: 10,
              borderRadius: 8,
              marginBottom: 15,
            }}
          >
            {error}
          </div>
        )}
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 5 }}>
            New Password (min 6 characters)
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showNew ? "text" : "password"}
              style={{
                width: "100%",
                padding: "10px",
                paddingRight: "40px",
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoFocus
            />
            <button
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 5 }}>
            Confirm New Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showConfirm ? "text" : "password"}
              style={{
                width: "100%",
                padding: "10px",
                paddingRight: "40px",
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          {!isFirstLogin && (
            <button
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                background: "#fff",
                color: "#4361ee",
                border: "1px solid #4361ee",
                cursor: "pointer",
                marginRight: 10,
              }}
              onClick={onClose}
            >
              Cancel
            </button>
          )}
          <button
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              background: "#4361ee",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const ForgotPasswordModal = ({ role, onReset, onClose }) => {
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const handleCheckUser = () => {
    if (!identifier) {
      setError("Please enter your Register Number (student) or Tutor ID/Email");
      return;
    }
    setStep(2);
    setError("");
  };

  const handleReset = () => {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    onReset(role, identifier, newPassword);
    onClose();
  };

  const styles = {
    formGroup: { marginBottom: 15 },
    label: { display: "block", fontWeight: 600, marginBottom: 5 },
    input: {
      width: "100%",
      padding: 10,
      borderRadius: 8,
      border: "1px solid #ddd",
      fontSize: 14,
      boxSizing: "border-box",
    },
    btn: {
      padding: "10px 20px",
      borderRadius: 8,
      background: "#4361ee",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
    },
    error: { color: "#ef233c", marginBottom: 10, fontSize: 14 },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          width: "90%",
          maxWidth: 400,
        }}
      >
        <h3>Forgot Password</h3>
        {step === 1 ? (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                {role === "student" ? "Register Number" : "Tutor ID / Email"}
              </label>
              <input
                style={styles.input}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            {error && <div style={styles.error}>{error}</div>}
            <button style={styles.btn} onClick={handleCheckUser}>
              Next
            </button>
          </>
        ) : (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                New Password (min 6 characters)
              </label>
              <input
                type="password"
                style={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm New Password</label>
              <input
                type="password"
                style={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <div style={styles.error}>{error}</div>}
            <button style={styles.btn} onClick={handleReset}>
              Reset Password
            </button>
          </>
        )}
        <div style={{ marginTop: 15, textAlign: "center" }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#4361ee",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 3. SIGNUP COMPONENTS (unchanged but with academics array)
// ============================================================

function StudentSignUp({ onSignUp, onBackToLogin }) {
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dept, setDept] = useState("CSE");
  const [year, setYear] = useState("1st");
  const [fatherName, setFatherName] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherPhone, setMotherPhone] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedRegNo = regNo.trim();
    const trimmedEmail = email.trim();
    if (!name || !regNo || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    const saved = localStorage.getItem("tms_all_data");
    const students = saved ? JSON.parse(saved).students : INITIAL_STUDENTS;
    if (students.some((s) => String(s.regNo || "").trim() === trimmedRegNo)) {
      setError("Register number already exists");
      return;
    }
    if (students.some((s) => String(s.email || "").trim().toLowerCase() === trimmedEmail.toLowerCase())) {
      setError("Email already registered");
      return;
    }
    const newStudent = {
      id: Date.now(),
      name: trimmedName,
      regNo: trimmedRegNo,
      dept,
      year,
      cgpa: "0.00",
      phone: "",
      email: trimmedEmail,
      dob: "",
      photo: null,
      status: "Active",
      fatherName,
      fatherPhone,
      motherName,
      motherPhone,
      address: "",
      password,
      isFirstLogin: false,
      onlineCoursesList: [],
      skillRackMedals: 0,
      skillRackProfile: "",
      additionalInfo: [],
      academics: [],
    };
    onSignUp(newStudent);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      background: "#fff",
      borderRadius: 24,
      padding: 40,
      width: "90%",
      maxWidth: 450,
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    },
    title: { fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8 },
    subtitle: { textAlign: "center", color: "#666", marginBottom: 30 },
    formGroup: { marginBottom: 20 },
    label: { display: "block", fontWeight: 600, marginBottom: 8 },
    inputContainer: { position: "relative", width: "100%" },
    input: {
      width: "100%",
      padding: "12px",
      paddingRight: "40px",
      borderRadius: 10,
      border: "2px solid #e0e7ff",
      fontSize: 14,
      boxSizing: "border-box",
    },
    eyeBtn: {
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 18,
    },
    btn: {
      width: "100%",
      padding: "14px",
      background: "#4361ee",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer",
    },
    error: {
      background: "#ef233c20",
      color: "#ef233c",
      padding: 12,
      borderRadius: 10,
      marginBottom: 20,
      textAlign: "center",
    },
    link: {
      textAlign: "center",
      marginTop: 20,
      color: "#4361ee",
      cursor: "pointer",
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>📝 Student Sign Up</div>
        <div style={styles.subtitle}>Create your account</div>
        <form onSubmit={handleSubmit}>
          {error && <div style={styles.error}>{error}</div>}
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name *</label>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Register Number *</label>
            <input
              style={styles.input}
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Department</label>
            <select
              style={styles.input}
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            >
              <option>CSE</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>MECH</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Year</label>
            <select
              style={styles.input}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Father's Name</label>
            <input
              style={styles.input}
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Father's Phone</label>
            <input
              style={styles.input}
              value={fatherPhone}
              onChange={(e) => setFatherPhone(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mother's Name</label>
            <input
              style={styles.input}
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mother's Phone</label>
            <input
              style={styles.input}
              value={motherPhone}
              onChange={(e) => setMotherPhone(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password * (min 6 characters)</label>
            <div style={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password *</label>
            <input
              type="password"
              style={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.btn}>
            Sign Up →
          </button>
        </form>
        <div style={styles.link} onClick={onBackToLogin}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
}

function TutorSignUp({ onSignUp, onBackToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    const saved = localStorage.getItem("tms_all_data");
    const tutors = saved ? JSON.parse(saved).tutors : INITIAL_TUTORS;
    if (tutors.some((t) => String(t.email || "").trim().toLowerCase() === trimmedEmail.toLowerCase())) {
      setError("Email already registered");
      return;
    }
    const newTutor = {
      id: "TUTOR" + Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      password,
      isFirstLogin: false,
    };
    onSignUp(newTutor);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      background: "#fff",
      borderRadius: 24,
      padding: 40,
      width: "90%",
      maxWidth: 450,
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    },
    title: { fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8 },
    subtitle: { textAlign: "center", color: "#666", marginBottom: 30 },
    formGroup: { marginBottom: 20 },
    label: { display: "block", fontWeight: 600, marginBottom: 8 },
    inputContainer: { position: "relative", width: "100%" },
    input: {
      width: "100%",
      padding: "12px",
      paddingRight: "40px",
      borderRadius: 10,
      border: "2px solid #e0e7ff",
      fontSize: 14,
      boxSizing: "border-box",
    },
    eyeBtn: {
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 18,
    },
    btn: {
      width: "100%",
      padding: "14px",
      background: "#4361ee",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer",
    },
    error: {
      background: "#ef233c20",
      color: "#ef233c",
      padding: 12,
      borderRadius: 10,
      marginBottom: 20,
      textAlign: "center",
    },
    link: {
      textAlign: "center",
      marginTop: 20,
      color: "#4361ee",
      cursor: "pointer",
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>👨‍🏫 Tutor Sign Up</div>
        <div style={styles.subtitle}>Create your tutor account</div>
        <form onSubmit={handleSubmit}>
          {error && <div style={styles.error}>{error}</div>}
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name *</label>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password * (min 6 characters)</label>
            <div style={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password *</label>
            <input
              type="password"
              style={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.btn}>
            Sign Up →
          </button>
        </form>
        <div style={styles.link} onClick={onBackToLogin}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 4. LOGIN COMPONENT (unchanged)
// ============================================================

function Login({
  onLogin,
  tutors,
  students,
  onForgotPassword,
  onStudentSignUp,
  onTutorSignUp,
}) {
  const [role, setRole] = useState("student");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const normalizeId = (value) => String(value || "").trim();
  const normalizeEmail = (value) => String(value || "").trim().toLowerCase();

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredId = normalizeId(loginId);
    const enteredEmail = normalizeEmail(loginId);
    if (role === "tutor") {
      const tutor = tutors.find((t) => normalizeId(t.id) === enteredId || normalizeEmail(t.email) === enteredEmail);
      if (tutor && tutor.password === password) {
        onLogin({
          role: "tutor",
          id: tutor.id,
          name: tutor.name,
          isFirstLogin: tutor.isFirstLogin,
        });
      } else {
        setError("Invalid Tutor ID/Email or Password");
      }
    } else {
      const student = students.find((s) => normalizeId(s.regNo) === enteredId);
      if (student && student.password === password) {
        onLogin({
          role: "student",
          id: student.id,
          name: student.name,
          regNo: student.regNo,
          isFirstLogin: student.isFirstLogin,
        });
      } else {
        setError("Invalid Register Number or Password");
      }
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      background: "#fff",
      borderRadius: 24,
      padding: 40,
      width: "90%",
      maxWidth: 450,
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    },
    title: { fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8 },
    subtitle: { textAlign: "center", color: "#666", marginBottom: 30 },
    roleSwitch: {
      display: "flex",
      gap: 10,
      marginBottom: 30,
      background: "#f0f4ff",
      borderRadius: 12,
      padding: 4,
    },
    roleBtn: (active) => ({
      flex: 1,
      padding: "12px",
      border: "none",
      borderRadius: 10,
      cursor: "pointer",
      fontWeight: 600,
      background: active ? "#4361ee" : "transparent",
      color: active ? "#fff" : "#666",
    }),
    formGroup: { marginBottom: 20 },
    label: { display: "block", fontWeight: 600, marginBottom: 8 },
    inputContainer: { position: "relative", width: "100%" },
    input: {
      width: "100%",
      padding: "12px",
      paddingRight: "40px",
      borderRadius: 10,
      border: "2px solid #e0e7ff",
      fontSize: 14,
      boxSizing: "border-box",
    },
    eyeBtn: {
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 18,
    },
    btn: {
      width: "100%",
      padding: "14px",
      background: "#4361ee",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer",
    },
    error: {
      background: "#ef233c20",
      color: "#ef233c",
      padding: 12,
      borderRadius: 10,
      marginBottom: 20,
      textAlign: "center",
    },
    link: {
      textAlign: "center",
      marginTop: 20,
      color: "#4361ee",
      cursor: "pointer",
      textDecoration: "underline",
    },
    forgotLink: {
      textAlign: "center",
      marginTop: 10,
      color: "#666",
      cursor: "pointer",
      fontSize: 14,
    },
    demoBox: {
      marginTop: 20,
      padding: 15,
      background: "#f8f9ff",
      borderRadius: 12,
      border: "1px solid #e0e7ff",
      fontSize: 13,
    },
    demoTitle: { fontWeight: 700, marginBottom: 8, color: "#4361ee" },
    demoItem: { marginBottom: 4 },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>🎓 NEC TMS</div>
        <div style={styles.subtitle}>Tutor Management System</div>
        <div style={styles.roleSwitch}>
          <button
            style={styles.roleBtn(role === "student")}
            onClick={() => setRole("student")}
          >
            Student Login
          </button>
          <button
            style={styles.roleBtn(role === "tutor")}
            onClick={() => setRole("tutor")}
          >
            Tutor Login
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div style={styles.error}>{error}</div>}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              {role === "tutor" ? "Tutor ID / Email" : "Register Number"}
            </label>
            <input
              type="text"
              style={styles.input}
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <button type="submit" style={styles.btn}>
            Login →
          </button>
        </form>
        <div style={styles.forgotLink} onClick={() => onForgotPassword(role)}>
          Forgot Password?
        </div>
        {role === "student" && (
          <div style={styles.link} onClick={onStudentSignUp}>
            New student? Sign up here
          </div>
        )}
        {role === "tutor" && (
          <div style={styles.link} onClick={onTutorSignUp}>
            New tutor? Register here
          </div>
        )}
        <div style={styles.demoBox}>
          <div style={styles.demoTitle}>📋 Demo Credentials</div>
          <div style={styles.demoItem}>
            <strong>Tutor:</strong> ID: TUTOR001 / Email: tutor@nec.edu /
            Password: 12345678
          </div>
          <div style={styles.demoItem}>
            <strong>Student 1:</strong> Reg No: 25104043 / Password: student123
          </div>
          <div style={styles.demoItem}>
            <strong>Student 2:</strong> Reg No: CS2021001 / Password: student123
          </div>
          <div style={{ fontSize: 11, color: "#888", marginTop: 8 }}>
            First login will prompt to change password.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 5. STUDENT DASHBOARD (with certifications edit)
// ============================================================

function StudentDashboard({
  student,
  attendance,
  activities,
  certifications,
  timetable,
  modules,
  moduleData,
  onUpdateStudent,
  onAddOnlineCourse,
  onDeleteOnlineCourse,
  onUpdateOnlineCourse,
  onAddCertification,
  onDeleteCertification,
  onUpdateCertification,
  onLogout,
  toast,
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [showModal, setShowModal] = useState(null);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseStatus, setNewCourseStatus] = useState("In Progress");
  const [editingOnlineCourseId, setEditingOnlineCourseId] = useState(null);
  const [newCert, setNewCert] = useState({
    name: "",
    duration: "",
    institute: "",
    remarks: "",
  });
  const [editingCert, setEditingCert] = useState(null);
  const [showSkillEditModal, setShowSkillEditModal] = useState(false);
  const [editSkillRackMedals, setEditSkillRackMedals] = useState(student.skillRackMedals);
  const [editSkillRackProfile, setEditSkillRackProfile] = useState(student.skillRackProfile || "");
  const [acadCoursesStudent, setAcadCoursesStudent] = useState([]);
  const [newCourseDataStudent, setNewCourseDataStudent] = useState({ code: "", name: "", instructor: "", credits: 0, coTest: 0, cat1: 0, cat2: 0, endSem: 0, grade: "O" });

  const studentAttendance = attendance?.[student.id] ?? {};
  const studentActivities = activities?.[student.id] ?? [];
  const studentCerts = certifications?.[student.id] ?? [];
  const studentTimetable = timetable?.[student.id] ?? { days: [], timeSlots: [], data: {} };
  const safeModules = modules ?? [];
  const safeModuleData = moduleData ?? {};
  const studentOnlineCourses = student.onlineCoursesList ?? [];
  const studentAcademics = student.academics ?? [];

  const totalAttended = Object.values(studentAttendance).reduce((s, m) => s + (m.attended || 0), 0);
  const totalConducted = Object.values(studentAttendance).reduce((s, m) => s + (m.conducted || 0), 0);
  const overallAttendance = totalConducted > 0 ? ((totalAttended / totalConducted) * 100).toFixed(2) : 0;
  const cgpa = calculateCGPAFromAcademics(studentAcademics);

  const loadAcademicsStudent = () => {
    setAcadCoursesStudent(Array.isArray(studentAcademics) ? [...studentAcademics] : []);
  };

  const handleUpdateCourseStudent = (courseId, field, value) => {
    setAcadCoursesStudent(prev => prev.map(c => c.id === courseId ? { ...c, [field]: value } : c));
  };

  const handleDeleteCourseStudent = (courseId) => {
    const updated = acadCoursesStudent.filter(c => c.id !== courseId);
    setAcadCoursesStudent(updated);
    onUpdateStudent(student.id, { academics: updated, cgpa: calculateCGPAFromAcademics(updated) });
  };

  const handleAddCourseStudent = () => {
    if (!newCourseDataStudent.code || !newCourseDataStudent.name) return;
    const newCourse = { ...newCourseDataStudent, id: Date.now(), date: new Date().toLocaleString(), credits: parseFloat(newCourseDataStudent.credits) || 0 };
    const updated = [...acadCoursesStudent, newCourse];
    setAcadCoursesStudent(updated);
    onUpdateStudent(student.id, { academics: updated, cgpa: calculateCGPAFromAcademics(updated) });
    setNewCourseDataStudent({ code: "", name: "", instructor: "", credits: 0, coTest: 0, cat1: 0, cat2: 0, endSem: 0, grade: "O" });
  };

  const saveAcademicsStudent = () => {
    onUpdateStudent(student.id, { academics: acadCoursesStudent, cgpa: calculateCGPAFromAcademics(acadCoursesStudent) });
    setShowModal(null);
  };

  const handleAddOnlineCourse = () => {
    if (newCourseName.trim()) {
      if (editingOnlineCourseId) {
        onUpdateOnlineCourse(student.id, { id: editingOnlineCourseId, name: newCourseName, status: newCourseStatus });
        setEditingOnlineCourseId(null);
      } else {
        onAddOnlineCourse(student.id, { id: Date.now(), name: newCourseName, status: newCourseStatus });
      }
      setNewCourseName("");
      setNewCourseStatus("In Progress");
      setShowModal(null);
    }
  };

  const handleDeleteOnlineCourse = (courseId) => {
    onDeleteOnlineCourse(student.id, courseId);
  };

  const handleAddCertification = () => {
    if (newCert.name.trim()) {
      onAddCertification(student.id, { ...newCert, id: Date.now() });
      setNewCert({ name: "", duration: "", institute: "", remarks: "" });
      setShowModal(null);
    }
  };

  const handleUpdateOwnSkills = () => {
    onUpdateStudent(student.id, {
      skillRackMedals: editSkillRackMedals,
      skillRackProfile: editSkillRackProfile,
    });
    setShowSkillEditModal(false);
  };

  const handleEditCertification = (cert) => {
    setEditingCert(cert);
    setShowModal("editCertification");
  };

  const handleSaveCertificationEdit = () => {
    onUpdateCertification(student.id, editingCert.id, editingCert);
    setEditingCert(null);
    setShowModal(null);
  };

  const styles = {
    container: { maxWidth: 1200, margin: "0 auto" },
    header: {
      background: "#1a1a2e",
      padding: "12px 24px",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 10,
    },
    profileHeader: {
      background: "#1a1a2e",
      borderRadius: 20,
      padding: 32,
      display: "flex",
      gap: 28,
      alignItems: "center",
      marginBottom: 24,
      color: "#fff",
      flexWrap: "wrap",
    },
    avatar: (color) => ({
      width: 88,
      height: 88,
      borderRadius: "50%",
      background: color,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: 32,
    }),
    tabs: {
      display: "flex",
      gap: 10,
      marginBottom: 24,
      borderBottom: "2px solid #e0e7ff",
      flexWrap: "wrap",
      overflowX: "auto",
    },
    tab: (active) => ({
      padding: "10px 20px",
      cursor: "pointer",
      fontWeight: 600,
      borderBottom: active ? "3px solid #4361ee" : "none",
      color: active ? "#4361ee" : "#666",
      background: "none",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
    }),
    card: {
      background: "#fff",
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 800,
      marginBottom: 16,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 10,
    },
    table: { width: "100%", borderCollapse: "collapse", fontSize: 13, overflowX: "auto" },
    th: {
      background: "#f8f9ff",
      padding: 12,
      textAlign: "left",
      fontWeight: 600,
      borderBottom: "2px solid #e0e7ff",
    },
    td: { padding: "10px 12px", borderBottom: "1px solid #f0f4ff" },
    btn: (variant) => {
      if (variant === "primary")
        return {
          background: "#4361ee",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 13,
        };
      if (variant === "danger")
        return {
          background: "#ef233c",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 13,
        };
      return {
        background: "transparent",
        color: "#4361ee",
        border: "2px solid #4361ee",
        padding: "8px 16px",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 13,
      };
    },
    smallBtn: {
      background: "#ef233c",
      color: "#fff",
      border: "none",
      padding: "4px 10px",
      borderRadius: 6,
      cursor: "pointer",
      fontSize: 11,
    },
    editBtn: {
      background: "#4361ee",
      color: "#fff",
      border: "none",
      padding: "4px 10px",
      borderRadius: 6,
      cursor: "pointer",
      fontSize: 11,
      marginRight: 5,
    },
    formGroup: { marginBottom: 15 },
    label: { display: "block", fontWeight: 600, fontSize: 13, marginBottom: 5 },
    input: {
      width: "100%",
      padding: 10,
      borderRadius: 8,
      border: "1px solid #ddd",
      fontSize: 14,
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: 10,
      borderRadius: 8,
      border: "1px solid #ddd",
      fontSize: 14,
    },
    statRow: { display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" },
    statBox: {
      background: "#f8f9ff",
      borderRadius: 12,
      padding: 15,
      minWidth: 150,
      textAlign: "center",
    },
    statValue: { fontSize: 28, fontWeight: 800, color: "#4361ee" },
    statLabel: { fontSize: 12, color: "#666" },
    toast: (type) => ({
      position: "fixed",
      bottom: 20,
      right: 20,
      background: type === "error" ? "#ef233c" : "#06d6a0",
      color: "#fff",
      padding: "12px 20px",
      borderRadius: 8,
      zIndex: 1000,
    }),
  };

  const ProfileCard = ({ title, value, icon }) => (
    <div style={styles.statBox}>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{icon} {title}</div>
    </div>
  );

  const renderProfile = () => (
    <div style={styles.card}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 15 }}>
        <div><strong>📧 Email:</strong> {student.email || "—"}</div>
        <div><strong>📱 Phone:</strong> {student.phone || "—"}</div>
        <div><strong>🎂 DOB:</strong> {student.dob || "—"}</div>
        <div><strong>🏫 Department:</strong> {student.dept}</div>
        <div><strong>📍 Address:</strong> {student.address || "—"}</div>
        <div><strong>👨 Father:</strong> {student.fatherName || "—"} ({student.fatherPhone || "—"})</div>
        <div><strong>👩 Mother:</strong> {student.motherName || "—"} ({student.motherPhone || "—"})</div>
      </div>
      {student.additionalInfo && student.additionalInfo.length > 0 && (
        <div style={{ marginTop: 15 }}>
          <strong>📌 Additional Info:</strong><br />
          {student.additionalInfo.map((info, idx) => (
            <div key={idx}><strong>{info.key}:</strong> {info.value}</div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTimetable = () => {
    const { days, timeSlots, data } = studentTimetable;
    if (!days || !timeSlots || days.length === 0 || timeSlots.length === 0) {
      return <div style={styles.card}>No timetable data</div>;
    }
    return (
      <div style={styles.card}>
        <div style={styles.cardTitle}>📅 Weekly Class Schedule</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ ...styles.table, minWidth: 860, borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ ...styles.th, background: "#f8f9ff", width: 170 }}>Time / Day</th>
                {days.map(day => (
                  <th key={day} style={{ ...styles.th, minWidth: 180 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span>{day}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, slotIdx) => (
                <tr key={slot}>
                  <td style={{ ...styles.td, background: "#f8f9ff", minWidth: 170 }}>
                    <strong>{slot}</strong>
                  </td>
                  {days.map((day, dayIdx) => {
                    const entry = data?.[slotIdx]?.[dayIdx];
                    return (
                      <td
                        key={`${day}-${slot}`}
                        style={{
                          ...styles.td,
                          padding: 16,
                          minWidth: 180,
                          verticalAlign: "top",
                          background: entry ? "#eef6ff" : "#fff",
                          cursor: "default",
                        }}
                      >
                        {entry ? (
                          <div style={{ display: "grid", gap: 4 }}>
                            <div style={{ fontWeight: 700, fontSize: 14 }}>{entry.name}</div>
                            <div style={{ fontSize: 12, color: "#444" }}>{entry.code}</div>
                            <div style={{ fontSize: 12, color: "#555" }}>{entry.venue}</div>
                            <div style={{ fontSize: 12, color: "#777" }}>{entry.faculty}</div>
                          </div>
                        ) : (
                          <span style={{ color: "#888" }}>No class assigned</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderAttendance = () => (
    <div>
      <div style={styles.statRow}>
        <ProfileCard title="Total Attended" value={totalAttended} icon="📊" />
        <ProfileCard title="Total Conducted" value={totalConducted} icon="📋" />
        <ProfileCard title="Overall Attendance" value={`${overallAttendance}%`} icon="✅" />
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Monthly Attendance</div>
        {Object.keys(studentAttendance).length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No attendance data</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Month</th>
                  <th style={styles.th}>Attended</th>
                  <th style={styles.th}>Conducted</th>
                  <th style={styles.th}>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(studentAttendance).map(([month, data]) => (
                  <tr key={month}>
                    <td style={styles.td}>{month}</td>
                    <td style={styles.td}>{data.attended}</td>
                    <td style={styles.td}>{data.conducted}</td>
                    <td style={styles.td}>{data.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderAcademics = () => {
    return (
      <div style={styles.card}>
        <div style={styles.cardTitle}>Course-wise Performance <button style={styles.btn("primary")} onClick={() => { loadAcademicsStudent(); setShowModal("editAcademics"); }}>✏️ Edit Academics</button></div>
        {studentAcademics.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No courses added</div>
        ) : (
          <div>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>S.No.</th>
                    <th style={styles.th}>Course Code</th>
                    <th style={styles.th}>Course Name</th>
                    <th style={styles.th}>Instructor</th>
                    <th style={styles.th}>Credits</th>
                    <th style={styles.th}>CO Test</th>
                    <th style={styles.th}>CAT I</th>
                    <th style={styles.th}>CAT II</th>
                    <th style={styles.th}>End Sem</th>
                    <th style={styles.th}>Grade</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {studentAcademics.map((c, idx) => (
                    <tr key={c.id}>
                      <td style={styles.td}>{idx + 1}</td>
                      <td style={styles.td}>{c.code}</td>
                      <td style={styles.td}>{c.name}</td>
                      <td style={styles.td}>{c.instructor}</td>
                      <td style={styles.td}>{c.credits}</td>
                      <td style={styles.td}>{c.coTest || 0}</td>
                      <td style={styles.td}>{c.cat1 || 0}</td>
                      <td style={styles.td}>{c.cat2 || 0}</td>
                      <td style={styles.td}>{c.endSem || 0}</td>
                      <td style={styles.td}>{c.grade}</td>
                      <td style={styles.td}>{c.date || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 20, justifyContent: "flex-end" }}>
              <div><strong>CGPA:</strong> {cgpa}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderActivities = () => (
    <div style={styles.card}>
      <div style={styles.cardTitle}>Activities</div>
      {studentActivities.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No activities recorded</div> : (
        studentActivities.map(act => (
          <div key={act.id} style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}>
            <strong>{act.title}</strong><br />
            <small>{act.type} | {act.venue} | {act.date}</small><br />
            <span style={{ color: "#4361ee" }}>{act.achievement}</span>
          </div>
        ))
      )}
    </div>
  );

  const renderCertifications = () => (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        Certifications
        <button style={styles.btn("primary")} onClick={() => setShowModal("addCertification")}>+ Add Certification</button>
      </div>
      {studentCerts.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No certifications added</div> : (
        studentCerts.map(cert => (
          <div key={cert.id} style={{ borderBottom: "1px solid #eee", padding: "12px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong>{cert.name}</strong><br />
              <small>{cert.duration} | {cert.institute}</small><br />
              <span style={{ color: "#06d6a0" }}>{cert.remarks}</span>
            </div>
            <div>
              <button style={styles.editBtn} onClick={() => handleEditCertification(cert)}>Edit</button>
              <button style={styles.smallBtn} onClick={() => onDeleteCertification(student.id, cert.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderSkills = () => (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        Skills
        <button style={styles.btn("primary")} onClick={() => { setEditSkillRackMedals(student.skillRackMedals); setEditSkillRackProfile(student.skillRackProfile || ""); setShowSkillEditModal(true); }}>✏️ Edit Skills</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <div><div style={{ fontWeight: 600, marginBottom: 5 }}>🏅 Skill Rack Medals</div><div style={{ fontSize: 24, fontWeight: 800, color: "#4361ee" }}>{student.skillRackMedals}</div></div>
        <div><div style={{ fontWeight: 600, marginBottom: 5 }}>🔗 SkillRack Profile</div>{student.skillRackProfile ? <a href={student.skillRackProfile} target="_blank" rel="noopener noreferrer" style={{ color: "#4361ee", wordBreak: "break-all" }}>{student.skillRackProfile}</a> : <span style={{ color: "#888" }}>Not set</span>}</div>
        <div><div style={{ fontWeight: 600, marginBottom: 5 }}>💻 Online Courses</div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 20, fontWeight: 600 }}>{studentOnlineCourses.length}</span><button style={styles.btn("primary")} onClick={() => setShowModal("manageCourses")}>Manage</button></div></div>
      </div>
    </div>
  );

  const renderModules = () => (
    <div>
      {safeModules.map(mod => {
        if (mod.type === "form") {
          const fields = mod.fields || [];
          const moduleContent = safeModuleData[`${student.id}_${mod.id}`] || {};
          const entries = Array.isArray(moduleContent.entries) ? moduleContent.entries : [];
          return (
            <div key={mod.id} style={styles.card}>
              <div style={styles.cardTitle}>{mod.icon} {mod.name}</div>
              {entries.length === 0 ? <div style={{ textAlign: "center", padding: 20, color: "#888" }}>No data yet</div> : (
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        {fields.map(f => <th key={f.id} style={styles.th}>{f.label}</th>)}
                        <th style={styles.th}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry, i) => (
                        <tr key={i}>
                          {fields.map(f => <td key={f.id} style={styles.td}>{entry[f.id] || "—"}</td>)}
                          <td style={styles.td}>{entry._date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        } else if (mod.type === "table") {
          const columns = mod.columns || [];
          const moduleContent = safeModuleData[`${student.id}_${mod.id}`] || {};
          const rows = Array.isArray(moduleContent.rows) ? moduleContent.rows : [];
          return (
            <div key={mod.id} style={styles.card}>
              <div style={styles.cardTitle}>{mod.icon} {mod.name}</div>
              {rows.length === 0 ? <div style={{ textAlign: "center", padding: 20, color: "#888" }}>No data yet</div> : (
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        {columns.map(col => <th key={col.id} style={styles.th}>{col.label}</th>)}
                        <th style={styles.th}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map(row => (
                        <tr key={row.id}>
                          {columns.map(col => <td key={col.id} style={styles.td}>{row[col.id] || "—"}</td>)}
                          <td style={styles.td}>{row._date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile": return renderProfile();
      case "timetable": return renderTimetable();
      case "attendance": return renderAttendance();
      case "academics": return renderAcademics();
      case "activities": return renderActivities();
      case "certifications": return renderCertifications();
      case "skills": return renderSkills();
      case "modules": return renderModules();
      default: return renderProfile();
    }
  };

  return (
    <>
      <div style={styles.header}><div style={{ fontWeight: "bold" }}>🎓 NEC TMS - Student Portal</div><div>Welcome, {student.name} <button style={{ background: "#ef233c", border: "none", padding: "6px 12px", borderRadius: 6, color: "#fff", cursor: "pointer", marginLeft: 15 }} onClick={onLogout}>Logout</button></div></div>
      <div style={styles.container}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar(getColor(student.id))}>{getInitials(student.name)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{student.name}</div>
            <div>{student.regNo} · {student.dept} · {student.year} Year</div>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <span style={{ background: "#4cc9f020", color: "#4cc9f0", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>{student.status}</span>
              <span style={{ background: "#06d6a020", color: "#06d6a0", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>CGPA {cgpa}</span>
              <span style={{ background: "#fb850020", color: "#fb8500", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>Attendance {overallAttendance}%</span>
            </div>
          </div>
        </div>
        <div style={styles.tabs}>
          <button style={styles.tab(activeTab === "profile")} onClick={() => setActiveTab("profile")}>📋 Profile</button>
          <button style={styles.tab(activeTab === "timetable")} onClick={() => setActiveTab("timetable")}>📅 Time Table</button>
          <button style={styles.tab(activeTab === "attendance")} onClick={() => setActiveTab("attendance")}>📊 Attendance</button>
          <button style={styles.tab(activeTab === "academics")} onClick={() => setActiveTab("academics")}>📚 Academics</button>
          <button style={styles.tab(activeTab === "activities")} onClick={() => setActiveTab("activities")}>🏆 Activities</button>
          <button style={styles.tab(activeTab === "certifications")} onClick={() => setActiveTab("certifications")}>📜 Certifications</button>
          <button style={styles.tab(activeTab === "skills")} onClick={() => setActiveTab("skills")}>💪 Skills</button>
          <button style={styles.tab(activeTab === "modules")} onClick={() => setActiveTab("modules")}>📦 Modules</button>
        </div>
        {renderContent()}
      </div>

      <Modal show={showModal === "manageCourses"} onClose={() => setShowModal(null)} title="Manage Online Courses">
        <div style={{ marginBottom: 16 }}>
          <input style={styles.input} placeholder="Course Name" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} />
          <select style={styles.select} value={newCourseStatus} onChange={(e) => setNewCourseStatus(e.target.value)}><option>In Progress</option><option>Completed</option><option>Not Started</option></select>
          <button style={styles.btn("primary")} onClick={handleAddOnlineCourse}>Add Course</button>
        </div>
        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          {studentOnlineCourses.map(course => (
            <div key={course.id} style={{ borderBottom: "1px solid #eee", padding: "8px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><strong>{course.name}</strong> – {course.status}</div>
              <div>
                <button style={styles.editBtn} onClick={() => { setEditingOnlineCourseId(course.id); setNewCourseName(course.name); setNewCourseStatus(course.status); }}>Edit</button>
                <button style={styles.smallBtn} onClick={() => handleDeleteOnlineCourse(course.id)}>Delete</button>
              </div>
            </div>
          ))}
          {studentOnlineCourses.length === 0 && <div style={{ textAlign: "center", padding: 20, color: "#888" }}>No courses added yet.</div>}
        </div>
      </Modal>

      <Modal show={showModal === "editAcademics"} onClose={() => setShowModal(null)} title="Edit Academics (Courses)">
        <div style={{ overflowX: "auto", marginBottom: 20 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Course Code</th><th style={styles.th}>Course Name</th><th style={styles.th}>Instructor</th>
                <th style={styles.th}>Credits</th><th style={styles.th}>CO Test</th><th style={styles.th}>CAT I</th>
                <th style={styles.th}>CAT II</th><th style={styles.th}>End Sem</th><th style={styles.th}>Grade</th><th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {acadCoursesStudent.map(course => (
                <tr key={course.id}>
                  <td style={styles.td}><input style={styles.input} value={course.code} onChange={e => handleUpdateCourseStudent(course.id, "code", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} value={course.name} onChange={e => handleUpdateCourseStudent(course.id, "name", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} value={course.instructor} onChange={e => handleUpdateCourseStudent(course.id, "instructor", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} type="number" step="any" value={course.credits} onChange={e => handleUpdateCourseStudent(course.id, "credits", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} type="number" value={course.coTest} onChange={e => handleUpdateCourseStudent(course.id, "coTest", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} type="number" value={course.cat1} onChange={e => handleUpdateCourseStudent(course.id, "cat1", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} type="number" value={course.cat2} onChange={e => handleUpdateCourseStudent(course.id, "cat2", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} type="number" value={course.endSem} onChange={e => handleUpdateCourseStudent(course.id, "endSem", e.target.value)} /></td>
                  <td style={styles.td}>
                    <select style={styles.select} value={course.grade} onChange={e => handleUpdateCourseStudent(course.id, "grade", e.target.value)}>
                      <option>O</option><option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option><option>D</option><option>E</option><option>F</option>
                    </select>
                  </td>
                  <td style={styles.td}><button style={styles.smallBtn} onClick={() => handleDeleteCourseStudent(course.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginBottom: 15 }}>
          <h4>Add New Course</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            <input style={styles.input} placeholder="Course Code" value={newCourseDataStudent.code} onChange={e => setNewCourseDataStudent({ ...newCourseDataStudent, code: e.target.value })} />
            <input style={styles.input} placeholder="Course Name" value={newCourseDataStudent.name} onChange={e => setNewCourseDataStudent({ ...newCourseDataStudent, name: e.target.value })} />
            <input style={styles.input} placeholder="Instructor" value={newCourseDataStudent.instructor} onChange={e => setNewCourseDataStudent({ ...newCourseDataStudent, instructor: e.target.value })} />
            <input style={styles.input} type="number" step="any" placeholder="Credits" value={newCourseDataStudent.credits} onChange={e => setNewCourseDataStudent({ ...newCourseDataStudent, credits: e.target.value })} />
            <input style={styles.input} type="number" placeholder="CO Test" value={newCourseDataStudent.coTest} onChange={e => setNewCourseDataStudent({ ...newCourseDataStudent, coTest: e.target.value })} />
            <input style={styles.input} type="number" placeholder="CAT I" value={newCourseDataStudent.cat1} onChange={e => setNewCourseDataStudent({ ...newCourseDataStudent, cat1: e.target.value })} />
            <input style={styles.input} type="number" placeholder="CAT II" value={newCourseDataStudent.cat2} onChange={e => setNewCourseDataStudent({ ...newCourseDataStudent, cat2: e.target.value })} />
            <input style={styles.input} type="number" placeholder="End Sem" value={newCourseDataStudent.endSem} onChange={e => setNewCourseDataStudent({ ...newCourseDataStudent, endSem: e.target.value })} />
            <select style={styles.select} value={newCourseDataStudent.grade} onChange={e => setNewCourseDataStudent({ ...newCourseDataStudent, grade: e.target.value })}>
              <option>O</option><option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option><option>D</option><option>E</option><option>F</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={styles.btn("primary")} onClick={handleAddCourseStudent}>Add Course</button>
          <button style={styles.btn("primary")} onClick={saveAcademicsStudent}>Save All Changes</button>
          <button style={styles.btn("ghost")} onClick={() => setShowModal(null)}>Cancel</button>
        </div>
      </Modal>

      <Modal show={showModal === "addCertification"} onClose={() => setShowModal(null)} title="Add Certification">
        <div style={styles.formGroup}><label style={styles.label}>Name</label><input style={styles.input} value={newCert.name} onChange={(e) => setNewCert({ ...newCert, name: e.target.value })} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Duration</label><input style={styles.input} value={newCert.duration} onChange={(e) => setNewCert({ ...newCert, duration: e.target.value })} placeholder="e.g., 6 Weeks" /></div>
        <div style={styles.formGroup}><label style={styles.label}>Institute</label><input style={styles.input} value={newCert.institute} onChange={(e) => setNewCert({ ...newCert, institute: e.target.value })} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Remarks</label><input style={styles.input} value={newCert.remarks} onChange={(e) => setNewCert({ ...newCert, remarks: e.target.value })} /></div>
        <button style={styles.btn("primary")} onClick={handleAddCertification}>Add Certification</button>
      </Modal>

      <Modal show={showModal === "editCertification"} onClose={() => setShowModal(null)} title="Edit Certification">
        {editingCert && (
          <>
            <div style={styles.formGroup}><label style={styles.label}>Name</label><input style={styles.input} value={editingCert.name} onChange={e => setEditingCert({ ...editingCert, name: e.target.value })} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Duration</label><input style={styles.input} value={editingCert.duration} onChange={e => setEditingCert({ ...editingCert, duration: e.target.value })} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Institute</label><input style={styles.input} value={editingCert.institute} onChange={e => setEditingCert({ ...editingCert, institute: e.target.value })} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Remarks</label><input style={styles.input} value={editingCert.remarks} onChange={e => setEditingCert({ ...editingCert, remarks: e.target.value })} /></div>
            <button style={styles.btn("primary")} onClick={handleSaveCertificationEdit}>Save</button>
          </>
        )}
      </Modal>

      <Modal show={showSkillEditModal} onClose={() => setShowSkillEditModal(false)} title="Edit Your Skills">
        <div style={styles.formGroup}><label style={styles.label}>🏅 Skill Rack Medals</label><input type="number" style={styles.input} value={editSkillRackMedals} onChange={(e) => setEditSkillRackMedals(parseInt(e.target.value) || 0)} /></div>
        <div style={styles.formGroup}><label style={styles.label}>🔗 SkillRack Profile URL</label><input type="url" style={styles.input} value={editSkillRackProfile} onChange={(e) => setEditSkillRackProfile(e.target.value)} placeholder="https://skillrack.com/..." /></div>
        <button style={styles.btn("primary")} onClick={handleUpdateOwnSkills}>Save Changes</button>
      </Modal>

      {toast && <div style={styles.toast(toast.type)}>{toast.msg}</div>}
    </>
  );
}

// ============================================================
// 6. TUTOR DASHBOARD (with module editing)
// ============================================================

function TutorDashboard({
  students,
  modules,
  onAddStudent,
  onDeleteStudent,
  onAddModule,
  onEditModule,
  onDeleteModule,
  onViewStudent,
  onLogout,
  tutor,
  onChangeTutorPassword,
  toast,
}) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [moduleFields, setModuleFields] = useState([]);
  const [moduleType, setModuleType] = useState("form");
  const [tableColumns, setTableColumns] = useState([]);
  const [tempFieldType, setTempFieldType] = useState("text");
  const [tempColumnLabel, setTempColumnLabel] = useState("");
  const [tempColumnType, setTempColumnType] = useState("text");
  const [tempColumnOptions, setTempColumnOptions] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [editingModule, setEditingModule] = useState(null);

  const nameRef = useRef(null);
  const regNoRef = useRef(null);
  const cgpaRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const dobRef = useRef(null);
  const deptRef = useRef(null);
  const yearRef = useRef(null);
  const fatherNameRef = useRef(null);
  const fatherPhoneRef = useRef(null);
  const motherNameRef = useRef(null);
  const motherPhoneRef = useRef(null);
  const addressRef = useRef(null);
  const passwordRef = useRef(null);

  const moduleNameRef = useRef(null);
  const moduleIconRef = useRef(null);
  const fieldLabelRef = useRef(null);
  const fieldOptionsRef = useRef(null);

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.regNo.toLowerCase().includes(search.toLowerCase()));

  const handleAddStudent = () => {
    const name = nameRef.current?.value || "";
    const regNo = regNoRef.current?.value || "";
    if (!name || !regNo) return;
    if (students.some(s => s.regNo === regNo)) { alert("Reg No exists!"); return; }
    onAddStudent({
      id: Date.now(), name, regNo,
      dept: deptRef.current?.value || "CSE",
      year: yearRef.current?.value || "1st",
      cgpa: "0.00",
      phone: phoneRef.current?.value || "",
      email: emailRef.current?.value || "",
      dob: dobRef.current?.value || "",
      status: "Active",
      photo: null,
      fatherName: fatherNameRef.current?.value || "",
      fatherPhone: fatherPhoneRef.current?.value || "",
      motherName: motherNameRef.current?.value || "",
      motherPhone: motherPhoneRef.current?.value || "",
      address: addressRef.current?.value || "",
      password: passwordRef.current?.value || "12345678",
      isFirstLogin: false,
      onlineCoursesList: [],
      skillRackMedals: 0,
      skillRackProfile: "",
      additionalInfo: [],
      academics: [],
    });
    setShowModal(false);
  };

  const handleAddField = () => {
    const label = fieldLabelRef.current?.value || "";
    if (!label) return;
    const newField = { id: genId(), label, type: tempFieldType, options: tempFieldType === "select" ? (fieldOptionsRef.current?.value || "").split(",").map(o => o.trim()) : [] };
    setModuleFields([...moduleFields, newField]);
    if (fieldLabelRef.current) fieldLabelRef.current.value = "";
    if (fieldOptionsRef.current) fieldOptionsRef.current.value = "";
  };

  const handleRemoveField = (id) => setModuleFields(moduleFields.filter(f => f.id !== id));

  const handleAddTableColumn = () => {
    if (!tempColumnLabel) return;
    const newColumn = { id: genId(), label: tempColumnLabel, type: tempColumnType, options: tempColumnType === "select" ? tempColumnOptions.split(",").map(o => o.trim()) : [] };
    setTableColumns([...tableColumns, newColumn]);
    setTempColumnLabel("");
    setTempColumnType("text");
    setTempColumnOptions("");
  };

  const handleRemoveTableColumn = (id) => setTableColumns(tableColumns.filter(c => c.id !== id));

  const handleAddModule = () => {
    const moduleName = moduleNameRef.current?.value || "";
    if (!moduleName) return;
    let newModule;
    if (moduleType === "form") {
      newModule = { id: genId(), name: moduleName, icon: moduleIconRef.current?.value || "📋", type: "form", fields: moduleFields };
    } else {
      newModule = { id: genId(), name: moduleName, icon: moduleIconRef.current?.value || "📊", type: "table", columns: tableColumns };
    }
    onAddModule(newModule);
    setModuleFields([]);
    setTableColumns([]);
    setModuleType("form");
    setShowModal(false);
  };

  const handleEditModule = (mod) => {
    setEditingModule(mod);
    setModuleType(mod.type);
    if (mod.type === "form") {
      setModuleFields(mod.fields || []);
      setTableColumns([]);
    } else {
      setTableColumns(mod.columns || []);
      setModuleFields([]);
    }
    if (moduleNameRef.current) moduleNameRef.current.value = mod.name;
    if (moduleIconRef.current) moduleIconRef.current.value = mod.icon;
    setShowModal("editModule");
  };

  const handleSaveModuleEdit = () => {
    const moduleName = moduleNameRef.current?.value || "";
    if (!moduleName) return;
    let updatedModule;
    if (moduleType === "form") {
      updatedModule = { ...editingModule, name: moduleName, icon: moduleIconRef.current?.value || "📋", type: "form", fields: moduleFields };
    } else {
      updatedModule = { ...editingModule, name: moduleName, icon: moduleIconRef.current?.value || "📊", type: "table", columns: tableColumns };
    }
    onEditModule(updatedModule);
    setModuleFields([]);
    setTableColumns([]);
    setEditingModule(null);
    setShowModal(false);
  };

  const styles = {
    container: { maxWidth: 1200, margin: "0 auto" },
    header: { background: "#1a1a2e", padding: "12px 24px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 },
    pageTitle: { fontSize: 28, fontWeight: 800, marginBottom: 6 },
    subtitle: { color: "#666", marginBottom: 24 },
    statsRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 },
    statCard: (color) => ({ background: "#fff", borderRadius: 12, padding: "16px 20px", borderLeft: `4px solid ${color}`, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }),
    statNum: { fontSize: 28, fontWeight: 800 },
    statLabel: { fontSize: 12, color: "#888" },
    toolbar: { display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" },
    search: { flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd", minWidth: 200 },
    btn: (variant) => {
      if (variant === "primary") return { background: "#4361ee", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: "bold" };
      if (variant === "danger") return { background: "#ef233c", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: "bold" };
      return { background: "#fff", color: "#4361ee", border: "1px solid #4361ee", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: "bold" };
    },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 },
    card: { background: "#fff", borderRadius: 12, padding: 16, textAlign: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
    avatar: (color) => ({ width: 60, height: 60, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: 20, margin: "0 auto 10px" }),
    cardName: { fontWeight: "bold" },
    cardReg: { fontSize: 11, color: "#888" },
    modal: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modalBox: { background: "#fff", borderRadius: 16, padding: 24, width: "90%", maxWidth: 600, maxHeight: "85vh", overflowY: "auto" },
    formGroup: { marginBottom: 15 },
    label: { display: "block", fontWeight: 600, fontSize: 13, marginBottom: 5 },
    input: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 14, boxSizing: "border-box" },
    select: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 14 },
    deleteBtn: { background: "#ef233c", color: "#fff", border: "none", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12 },
    editBtnSmall: { background: "#4361ee", color: "#fff", border: "none", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12, marginRight: 5 },
    inputContainer: { position: "relative", width: "100%" },
    eyeBtn: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16 },
    typeSwitch: { display: "flex", gap: 10, marginBottom: 20, background: "#f0f4ff", borderRadius: 12, padding: 4 },
    typeBtn: (active) => ({ flex: 1, padding: 10, border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, background: active ? "#4361ee" : "transparent", color: active ? "#fff" : "#666" }),
    toast: (type) => ({ position: "fixed", bottom: 20, right: 20, background: type === "error" ? "#ef233c" : "#06d6a0", color: "#fff", padding: "12px 20px", borderRadius: 8, zIndex: 1000 }),
  };

  const total = students.length;
  const avgCgpa = (students.reduce((s, a) => s + (parseFloat(a.cgpa) || 0), 0) / total || 0).toFixed(2);

  return (
    <>
      <div style={styles.header}>
        <div style={{ fontWeight: "bold" }}>🎓 NEC TMS - Tutor Portal</div>
        <div>Welcome, {tutor.name}<button onClick={() => setShowChangePassword(true)} style={{ marginLeft: 10, background: "#4361ee", border: "none", padding: "6px 12px", borderRadius: 6, color: "#fff", cursor: "pointer" }}>Change Password</button><button onClick={onLogout} style={{ marginLeft: 10, background: "#ef233c", border: "none", padding: "6px 12px", borderRadius: 6, color: "#fff", cursor: "pointer" }}>Logout</button></div>
      </div>
      <div style={styles.container}>
        <div style={styles.pageTitle}>📚 Tutor Dashboard</div>
        <div style={styles.subtitle}>NEC Computer Science & Engineering</div>
        <div style={styles.statsRow}>
          <div style={styles.statCard("#4361ee")}><div style={{ fontSize: 24 }}>👥</div><div style={styles.statNum}>{total}</div><div style={styles.statLabel}>Students</div></div>
          <div style={styles.statCard("#06d6a0")}><div style={styles.statNum}>{modules.length}</div><div style={styles.statLabel}>Modules</div></div>
          <div style={styles.statCard("#fb8500")}><div style={styles.statNum}>{avgCgpa}</div><div style={styles.statLabel}>Avg CGPA</div></div>
        </div>
        <div style={styles.toolbar}>
          <input style={styles.search} placeholder="🔍 Search by name or reg no..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button style={styles.btn("primary")} onClick={() => setShowModal("addStudent")}>+ Add Student</button>
          <button style={styles.btn("ghost")} onClick={() => { setEditingModule(null); setModuleFields([]); setTableColumns([]); setModuleType("form"); if (moduleNameRef.current) moduleNameRef.current.value = ""; if (moduleIconRef.current) moduleIconRef.current.value = "📋"; setShowModal("addModule"); }}>📦 + Create Module</button>
        </div>
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 12 }}>Existing Modules</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {modules.map(mod => (
              <div key={mod.id} style={{ background: "#fff", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
                <span>{mod.icon} {mod.name}</span><span style={{ fontSize: 11, color: "#888" }}>({mod.type})</span>
                <button style={styles.editBtnSmall} onClick={() => handleEditModule(mod)}>Edit</button>
                <button style={styles.deleteBtn} onClick={() => { if (window.confirm("Delete module?")) onDeleteModule(mod.id); }}>Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.grid}>
          {filtered.map(s => (
            <div key={s.id} style={styles.card} onClick={() => onViewStudent(s)}>
              <div style={styles.avatar(getColor(s.id))}>{getInitials(s.name)}</div>
              <div style={styles.cardName}>{s.name}</div>
              <div style={styles.cardReg}>{s.regNo}</div>
              <button style={styles.deleteBtn} onClick={(e) => { e.stopPropagation(); if (window.confirm("Delete student?")) onDeleteStudent(s.id); }}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {(showModal === "addModule" || showModal === "editModule") && (
        <div style={styles.modal} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div style={styles.modalBox}>
            <h3>{editingModule ? "Edit Module" : "Create Module"}</h3>
            <div style={styles.typeSwitch}>
              <button style={styles.typeBtn(moduleType === "form")} onClick={() => { setModuleType("form"); setTableColumns([]); setModuleFields([]); }}>📝 Form Fields</button>
              <button style={styles.typeBtn(moduleType === "table")} onClick={() => { setModuleType("table"); setModuleFields([]); setTableColumns([]); }}>📊 Table Format</button>
            </div>
            <div style={styles.formGroup}><label style={styles.label}>Module Name</label><input ref={moduleNameRef} style={styles.input} placeholder="e.g., Marks Sheet" defaultValue={editingModule?.name || ""} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Icon (emoji)</label><input ref={moduleIconRef} style={{ ...styles.input, width: 80 }} defaultValue={editingModule?.icon || "📋"} /></div>

            {moduleType === "form" ? (
              <>
                <div style={{ fontWeight: 700, marginBottom: 12 }}>Form Fields</div>
                {moduleFields.map(f => (<div key={f.id} style={{ background: "#f0f4ff", padding: 8, borderRadius: 6, marginBottom: 8, display: "flex", justifyContent: "space-between" }}><span>{f.label} ({f.type})</span><button style={styles.deleteBtn} onClick={() => handleRemoveField(f.id)}>X</button></div>))}
                <div style={{ background: "#f8f9ff", padding: 15, borderRadius: 12, marginTop: 12 }}>
                  <div><strong>Add Field</strong></div>
                  <input ref={fieldLabelRef} style={styles.input} placeholder="Field Label" />
                  <select style={styles.select} value={tempFieldType} onChange={(e) => setTempFieldType(e.target.value)}><option>text</option><option>number</option><option>date</option><option>select</option></select>
                  {tempFieldType === "select" && <input ref={fieldOptionsRef} style={styles.input} placeholder="Options (comma separated)" />}
                  <button style={styles.btn("primary")} onClick={handleAddField}>+ Add Field</button>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontWeight: 700, marginBottom: 12 }}>Table Columns (Headers)</div>
                {tableColumns.map(col => (<div key={col.id} style={{ background: "#f0f4ff", padding: 8, borderRadius: 6, marginBottom: 8, display: "flex", justifyContent: "space-between" }}><span>{col.label} ({col.type})</span><button style={styles.deleteBtn} onClick={() => handleRemoveTableColumn(col.id)}>X</button></div>))}
                <div style={{ background: "#f8f9ff", padding: 15, borderRadius: 12, marginTop: 12 }}>
                  <div><strong>Add Column</strong></div>
                  <input style={styles.input} placeholder="Column Label (e.g., Subject Name)" value={tempColumnLabel} onChange={(e) => setTempColumnLabel(e.target.value)} />
                  <select style={styles.select} value={tempColumnType} onChange={(e) => setTempColumnType(e.target.value)}><option>text</option><option>number</option><option>date</option><option>select</option></select>
                  {tempColumnType === "select" && <input style={styles.input} placeholder="Options (comma separated)" value={tempColumnOptions} onChange={(e) => setTempColumnOptions(e.target.value)} />}
                  <button style={styles.btn("primary")} onClick={handleAddTableColumn}>+ Add Column</button>
                </div>
              </>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button style={styles.btn("primary")} onClick={editingModule ? handleSaveModuleEdit : handleAddModule}>{editingModule ? "Save Changes" : "Create"}</button>
              <button style={styles.btn("ghost")} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showModal === "addStudent" && (
        <div style={styles.modal} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div style={styles.modalBox}>
            <h3>Add Student</h3>
            <div style={styles.formGroup}><label style={styles.label}>Full Name *</label><input ref={nameRef} style={styles.input} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Reg No *</label><input ref={regNoRef} style={styles.input} /></div>
            <div style={styles.formGroup}><label style={styles.label}>CGPA</label><input ref={cgpaRef} style={styles.input} type="number" step="0.1" /></div>
            <div style={styles.formGroup}><label style={styles.label}>Phone</label><input ref={phoneRef} style={styles.input} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Email</label><input ref={emailRef} style={styles.input} type="email" /></div>
            <div style={styles.formGroup}><label style={styles.label}>Password</label><div style={styles.inputContainer}><input ref={passwordRef} type={showPassword ? "text" : "password"} style={styles.input} defaultValue="12345678" /><button style={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>{showPassword ? "👁️" : "👁️‍🗨️"}</button></div></div>
            <div style={styles.formGroup}><label style={styles.label}>DOB</label><input ref={dobRef} style={styles.input} type="date" /></div>
            <div style={styles.formGroup}><label style={styles.label}>Dept</label><select ref={deptRef} style={styles.select}><option>CSE</option><option>ECE</option><option>EEE</option><option>MECH</option></select></div>
            <div style={styles.formGroup}><label style={styles.label}>Year</label><select ref={yearRef} style={styles.select}><option>1st</option><option>2nd</option><option>3rd</option><option>4th</option></select></div>
            <div style={styles.formGroup}><label style={styles.label}>Father's Name</label><input ref={fatherNameRef} style={styles.input} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Father's Phone</label><input ref={fatherPhoneRef} style={styles.input} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Mother's Name</label><input ref={motherNameRef} style={styles.input} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Mother's Phone</label><input ref={motherPhoneRef} style={styles.input} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Address</label><input ref={addressRef} style={styles.input} /></div>
            <div style={{ display: "flex", gap: 10 }}><button style={styles.btn("primary")} onClick={handleAddStudent}>Add</button><button style={styles.btn("ghost")} onClick={() => setShowModal(false)}>Cancel</button></div>
          </div>
        </div>
      )}

      {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} onSave={onChangeTutorPassword} />}
      {toast && <div style={styles.toast(toast.type)}>{toast.msg}</div>}
    </>
  );
}

// ============================================================
// 7. TUTOR STUDENT VIEW (full edit capabilities)
// ============================================================

function TutorStudentView({
  student,
  attendance,
  activities,
  certifications,
  skills,
  timetable,
  modules,
  moduleData,
  onSaveAttendance,
  onAddActivity,
  onDeleteActivity,
  onUpdateActivity,
  onAddCertification,
  onDeleteCertification,
  onUpdateCertification,
  onUpdateStudent,
  onChangePassword,
  onUpdateSkills,
  onAddTimetableEntry,
  onDeleteTimetableEntry,
  onSaveModuleData,
  onSaveTableRowData,
  onDeleteTableRowData,
  onAddOnlineCourse,
  onDeleteOnlineCourse,
  onUpdateOnlineCourse,
  onEditModule,
  onBack,
  onLogout,
  toast,
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [showModal, setShowModal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [fillModuleId, setFillModuleId] = useState(null);
  const [fillForm, setFillForm] = useState({});
  const [editingAttendanceMonth, setEditingAttendanceMonth] = useState(null);
  const [addRowModuleId, setAddRowModuleId] = useState(null);
  const [newRowData, setNewRowData] = useState({});
  const [additionalKey, setAdditionalKey] = useState("");
  const [additionalValue, setAdditionalValue] = useState("");
  const [timetableStruct, setTimetableStruct] = useState(null);
  const [newDay, setNewDay] = useState("");
  const [newTimeSlot, setNewTimeSlot] = useState("");
  const [editingTimetableCell, setEditingTimetableCell] = useState({ dayIdx: null, slotIdx: null, entry: null });
  const [timetableCellForm, setTimetableCellForm] = useState({ code: "", name: "", venue: "", faculty: "" });
  const [editingActivity, setEditingActivity] = useState(null);
  const [editingCert, setEditingCert] = useState(null);
  // Module structure editing states
  const [editingModuleStruct, setEditingModuleStruct] = useState(null);
  const [moduleStructFields, setModuleStructFields] = useState([]);
  const [moduleStructColumns, setModuleStructColumns] = useState([]);
  const [moduleStructType, setModuleStructType] = useState("form");
  const [structTempFieldType, setStructTempFieldType] = useState("text");
  const [structTempColumnLabel, setStructTempColumnLabel] = useState("");
  const [structTempColumnType, setStructTempColumnType] = useState("text");
  const [structTempColumnOptions, setStructTempColumnOptions] = useState("");
  const structFieldLabelRef = useRef(null);
  const structFieldOptionsRef = useRef(null);
  // Academics state
  const [acadCourses, setAcadCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourseData, setNewCourseData] = useState({
    code: "", name: "", instructor: "", credits: 0, coTest: 0, cat1: 0, cat2: 0, endSem: 0, grade: "O",
  });
  const [newCourseNameManager, setNewCourseNameManager] = useState("");
  const [newCourseStatusManager, setNewCourseStatusManager] = useState("In Progress");
  const [editingOnlineCourseId, setEditingOnlineCourseId] = useState(null);

  const editNameRef = useRef(null);
  const editPhoneRef = useRef(null);
  const editAddressRef = useRef(null);
  const editFatherNameRef = useRef(null);
  const editFatherPhoneRef = useRef(null);
  const editMotherNameRef = useRef(null);
  const editMotherPhoneRef = useRef(null);
  const editRegNoRef = useRef(null);
  const editEmailRef = useRef(null);
  const editDobRef = useRef(null);
  const editDeptRef = useRef(null);
  const editYearRef = useRef(null);
  const editCgpaRef = useRef(null);
  const editStatusRef = useRef(null);
  const editPasswordRef = useRef(null);
  const editSkillRackProfileRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const activityTypeRef = useRef(null);
  const activityVenueRef = useRef(null);
  const activityTitleRef = useRef(null);
  const activityDateRef = useRef(null);
  const activityAchievementRef = useRef(null);
  const certNameRef = useRef(null);
  const certDurationRef = useRef(null);
  const certInstituteRef = useRef(null);
  const certRemarksRef = useRef(null);
  const monthRef = useRef(null);
  const attendedRef = useRef(null);
  const conductedRef = useRef(null);
  const skillRackMedalsRef = useRef(null);
  const onlineCoursesRef = useRef(null);
  const editAttendedRef = useRef(null);
  const editConductedRef = useRef(null);

  const studentAttendance = attendance?.[student.id] ?? {};
  const studentActivities = activities?.[student.id] ?? [];
  const studentCerts = certifications?.[student.id] ?? [];
  const studentSkills = skills?.[student.id] ?? { skillRackMedals: 0, onlineCourses: 0 };
  const studentTimetable = timetable?.[student.id] ?? { days: [], timeSlots: [], data: {} };
  const safeModules = modules ?? [];
  const safeModuleData = moduleData ?? {};
  const studentOnlineCourses = student.onlineCoursesList ?? [];
  const studentAcademics = student.academics ?? [];

  const totalAttended = Object.values(studentAttendance).reduce((s, m) => s + (m.attended || 0), 0);
  const totalConducted = Object.values(studentAttendance).reduce((s, m) => s + (m.conducted || 0), 0);
  const overallAttendance = totalConducted > 0 ? ((totalAttended / totalConducted) * 100).toFixed(2) : 0;
  const cgpa = calculateCGPAFromAcademics(studentAcademics);

  const handleUpdateProfile = () => {
    onUpdateStudent(student.id, {
      name: editNameRef.current?.value || student.name,
      regNo: editRegNoRef.current?.value || student.regNo,
      phone: editPhoneRef.current?.value || student.phone,
      email: editEmailRef.current?.value || student.email,
      dob: editDobRef.current?.value || student.dob,
      dept: editDeptRef.current?.value || student.dept,
      year: editYearRef.current?.value || student.year,
      cgpa: editCgpaRef.current?.value || student.cgpa,
      address: editAddressRef.current?.value || student.address,
      fatherName: editFatherNameRef.current?.value || student.fatherName,
      fatherPhone: editFatherPhoneRef.current?.value || student.fatherPhone,
      motherName: editMotherNameRef.current?.value || student.motherName,
      motherPhone: editMotherPhoneRef.current?.value || student.motherPhone,
      status: editStatusRef.current?.value || student.status,
      password: editPasswordRef.current?.value || student.password,
      skillRackProfile: editSkillRackProfileRef.current?.value || student.skillRackProfile,
    });
    setShowModal(null);
  };

  const handleUpdateSkills = () => {
    const newMedals = parseInt(skillRackMedalsRef.current?.value) || 0;
    onUpdateSkills(student.id, { skillRackMedals: newMedals, onlineCourses: parseInt(onlineCoursesRef.current?.value) || 0 });
    onUpdateStudent(student.id, { skillRackMedals: newMedals });
    setShowModal(null);
  };

  const handleUpdateAttendance = (month) => {
    const attended = parseInt(editAttendedRef.current?.value) || 0;
    const conducted = parseInt(editConductedRef.current?.value) || 0;
    const percentage = conducted > 0 ? ((attended / conducted) * 100).toFixed(2) : 0;
    onSaveAttendance(student.id, month, { attended, conducted, percentage: parseFloat(percentage) });
    setEditingAttendanceMonth(null);
    setShowModal(null);
  };

  const handleAddAttendance = () => {
    const month = monthRef.current?.value;
    const attended = parseInt(attendedRef.current?.value) || 0;
    const conducted = parseInt(conductedRef.current?.value) || 0;
    const percentage = conducted > 0 ? ((attended / conducted) * 100).toFixed(2) : 0;
    if (month) {
      onSaveAttendance(student.id, month, { attended, conducted, percentage: parseFloat(percentage) });
      setShowModal(null);
    }
  };

  const handleSaveFormModuleData = (moduleId) => {
    const key = `${student.id}_${moduleId}`;
    const current = safeModuleData[key] || { entries: [] };
    const entries = Array.isArray(current.entries) ? current.entries : [];
    const newEntry = { ...fillForm, _date: new Date().toLocaleString(), _id: Date.now() };
    onSaveModuleData(student.id, moduleId, [...entries, newEntry]);
    setFillForm({});
    setFillModuleId(null);
  };

  const handleAddTableRow = (moduleId, columns) => {
    const newRow = { id: Date.now(), _date: new Date().toLocaleString() };
    columns.forEach(col => { newRow[col.id] = ""; });
    const key = `${student.id}_${moduleId}`;
    const current = safeModuleData[key] || { rows: [] };
    const rows = Array.isArray(current.rows) ? current.rows : [];
    onSaveTableRowData(student.id, moduleId, [...rows, newRow]);
    setAddRowModuleId(null);
    setNewRowData({});
  };

  const handleUpdateTableRow = (moduleId, rowId, rowData) => {
    const key = `${student.id}_${moduleId}`;
    const current = safeModuleData[key] || { rows: [] };
    const rows = Array.isArray(current.rows) ? current.rows : [];
    const updated = rows.map(row => (row.id === rowId ? { ...row, ...rowData } : row));
    onSaveTableRowData(student.id, moduleId, updated);
    setEditingId(null);
    setNewRowData({});
  };

  const handleDeleteTableRow = (moduleId, rowId) => {
    const key = `${student.id}_${moduleId}`;
    const current = safeModuleData[key] || { rows: [] };
    const rows = Array.isArray(current.rows) ? current.rows : [];
    const updated = rows.filter(row => row.id !== rowId);
    onDeleteTableRowData(student.id, moduleId, updated);
  };

  // Module structure edit handlers
  const openModuleStructureEditor = (mod) => {
    setEditingModuleStruct(mod);
    setModuleStructType(mod.type);
    if (mod.type === "form") {
      setModuleStructFields(mod.fields || []);
      setModuleStructColumns([]);
    } else {
      setModuleStructColumns(mod.columns || []);
      setModuleStructFields([]);
    }
    setShowModal("editModuleStructure");
  };

  const handleAddStructField = () => {
    const label = structFieldLabelRef.current?.value || "";
    if (!label) return;
    const newField = { id: genId(), label, type: structTempFieldType, options: structTempFieldType === "select" ? (structFieldOptionsRef.current?.value || "").split(",").map(o => o.trim()) : [] };
    setModuleStructFields([...moduleStructFields, newField]);
    if (structFieldLabelRef.current) structFieldLabelRef.current.value = "";
    if (structFieldOptionsRef.current) structFieldOptionsRef.current.value = "";
  };

  const handleRemoveStructField = (id) => setModuleStructFields(moduleStructFields.filter(f => f.id !== id));

  const handleAddStructColumn = () => {
    if (!structTempColumnLabel) return;
    const newColumn = { id: genId(), label: structTempColumnLabel, type: structTempColumnType, options: structTempColumnType === "select" ? structTempColumnOptions.split(",").map(o => o.trim()) : [] };
    setModuleStructColumns([...moduleStructColumns, newColumn]);
    setStructTempColumnLabel("");
    setStructTempColumnType("text");
    setStructTempColumnOptions("");
  };

  const handleRemoveStructColumn = (id) => setModuleStructColumns(moduleStructColumns.filter(c => c.id !== id));

  const saveModuleStructureEdit = () => {
    if (!editingModuleStruct) return;
    let updatedModule;
    if (moduleStructType === "form") {
      updatedModule = { ...editingModuleStruct, type: "form", fields: moduleStructFields };
    } else {
      updatedModule = { ...editingModuleStruct, type: "table", columns: moduleStructColumns };
    }
    onEditModule(updatedModule);
    setEditingModuleStruct(null);
    setModuleStructFields([]);
    setModuleStructColumns([]);
    setShowModal(null);
  };

  // Academics handlers
  const loadAcademics = () => {
    setAcadCourses([...studentAcademics]);
  };

  const handleAddCourse = () => {
    if (newCourseData.code && newCourseData.name) {
      const newCourse = {
        ...newCourseData,
        id: Date.now(),
        date: new Date().toLocaleString(),
        credits: parseFloat(newCourseData.credits) || 0,
        coTest: parseInt(newCourseData.coTest) || 0,
        cat1: parseInt(newCourseData.cat1) || 0,
        cat2: parseInt(newCourseData.cat2) || 0,
        endSem: parseInt(newCourseData.endSem) || 0,
      };
      const updated = [...acadCourses, newCourse];
      setAcadCourses(updated);
      onUpdateStudent(student.id, { academics: updated, cgpa: calculateCGPAFromAcademics(updated) });
      setNewCourseData({ code: "", name: "", instructor: "", credits: 0, coTest: 0, cat1: 0, cat2: 0, endSem: 0, grade: "O" });
      setShowModal(null);
    }
  };

  const handleUpdateCourse = (courseId, field, value) => {
    setAcadCourses(prev => prev.map(c => c.id === courseId ? { ...c, [field]: value } : c));
  };

  const handleDeleteCourse = (courseId) => {
    const updated = acadCourses.filter(c => c.id !== courseId);
    setAcadCourses(updated);
    onUpdateStudent(student.id, { academics: updated, cgpa: calculateCGPAFromAcademics(updated) });
  };

  const saveAcademics = () => {
    onUpdateStudent(student.id, { academics: acadCourses, cgpa: calculateCGPAFromAcademics(acadCourses) });
    setShowModal(null);
  };

  const handleAddOnlineCourse = () => {
    const name = newCourseNameManager?.trim();
    const status = newCourseStatusManager;
    if (!name) return;
    if (editingOnlineCourseId) {
      onUpdateOnlineCourse && onUpdateOnlineCourse(student.id, { id: editingOnlineCourseId, name, status });
      setEditingOnlineCourseId(null);
    } else {
      onAddOnlineCourse(student.id, { id: Date.now(), name, status });
    }
    setNewCourseNameManager("");
    setNewCourseStatusManager("In Progress");
    setShowModal(null);
  };

  const handleDeleteOnlineCourse = (courseId) => {
    onDeleteOnlineCourse(student.id, courseId);
  };

  const handleAddAdditionalInfo = () => {
    if (additionalKey.trim()) {
      const newInfo = [...(student.additionalInfo || []), { key: additionalKey, value: additionalValue }];
      onUpdateStudent(student.id, { additionalInfo: newInfo });
      setAdditionalKey("");
      setAdditionalValue("");
      setShowModal(null);
    }
  };

  const handleDeleteAdditionalInfo = (index) => {
    const newInfo = (student.additionalInfo || []).filter((_, i) => i !== index);
    onUpdateStudent(student.id, { additionalInfo: newInfo });
  };

  // Timetable structure handlers
  const openTimetableEditor = () => {
    setTimetableStruct({
      days: [...(studentTimetable.days || [])],
      timeSlots: [...(studentTimetable.timeSlots || [])],
      data: { ...studentTimetable.data },
    });
    setShowModal("editTimetableStructure");
  };

  const handleAddDay = () => {
    if (newDay.trim()) {
      setTimetableStruct(prev => {
        const newDays = [...prev.days, newDay.trim()];
        const newData = { ...prev.data };
        for (let i = 0; i < prev.timeSlots.length; i++) {
          newData[i] = { ...newData[i] };
          newData[i][newDays.length - 1] = null;
        }
        return { ...prev, days: newDays, data: newData };
      });
      setNewDay("");
    }
  };

  const handleRemoveDay = (idx) => {
    setTimetableStruct(prev => {
      const newDays = prev.days.filter((_, i) => i !== idx);
      const newData = {};
      for (let i = 0; i < prev.timeSlots.length; i++) {
        newData[i] = {};
        for (let j = 0; j < newDays.length; j++) {
          newData[i][j] = prev.data?.[i]?.[j < idx ? j : j+1] || null;
        }
      }
      return { ...prev, days: newDays, data: newData };
    });
  };

  const handleEditDay = (idx, newLabel) => {
    setTimetableStruct(prev => {
      const newDays = [...prev.days];
      newDays[idx] = newLabel;
      return { ...prev, days: newDays };
    });
  };

  const handleAddTimeSlot = () => {
    if (newTimeSlot.trim()) {
      setTimetableStruct(prev => {
        const newSlots = [...prev.timeSlots, newTimeSlot.trim()];
        const newData = { ...prev.data };
        newData[newSlots.length - 1] = {};
        for (let j = 0; j < prev.days.length; j++) newData[newSlots.length - 1][j] = null;
        return { ...prev, timeSlots: newSlots, data: newData };
      });
      setNewTimeSlot("");
    }
  };

  const handleRemoveTimeSlot = (idx) => {
    setTimetableStruct(prev => {
      const newSlots = prev.timeSlots.filter((_, i) => i !== idx);
      const newData = {};
      for (let i = 0; i < newSlots.length; i++) {
        newData[i] = prev.data[i < idx ? i : i+1] || {};
      }
      return { ...prev, timeSlots: newSlots, data: newData };
    });
  };

  const handleEditTimeSlot = (idx, newLabel) => {
    setTimetableStruct(prev => {
      const newSlots = [...prev.timeSlots];
      newSlots[idx] = newLabel;
      return { ...prev, timeSlots: newSlots };
    });
  };

  const saveTimetableStructure = () => {
    onAddTimetableEntry(student.id, {
      days: timetableStruct.days,
      timeSlots: timetableStruct.timeSlots,
      data: timetableStruct.data,
    });
    setShowModal(null);
  };

  const openTimetableCellEditor = (dayIdx, slotIdx, entry) => {
    setEditingTimetableCell({ dayIdx, slotIdx, entry: entry || null });
    setTimetableCellForm({
      code: entry?.code || "",
      name: entry?.name || "",
      venue: entry?.venue || "",
      faculty: entry?.faculty || "",
    });
    setShowModal("editTimetableCell");
  };

  const saveTimetableCell = () => {
    const { dayIdx, slotIdx } = editingTimetableCell;
    const newEntry = { ...timetableCellForm };
    const currentT = studentTimetable;
    let newData = { ...currentT.data };
    if (!newData[slotIdx]) newData[slotIdx] = {};
    if (!newEntry.name) {
      delete newData[slotIdx][dayIdx];
    } else {
      newData[slotIdx][dayIdx] = newEntry;
    }
    const updatedTimetable = {
      days: currentT.days,
      timeSlots: currentT.timeSlots,
      data: newData,
    };
    onAddTimetableEntry(student.id, updatedTimetable);
    setShowModal(null);
    setEditingTimetableCell({ dayIdx: null, slotIdx: null, entry: null });
  };

  const handleDeleteDay = (dayIdx) => {
    if (!window.confirm("Delete this day and its timetable entries?")) return;
    const currentT = studentTimetable;
    const newDays = currentT.days.filter((_, i) => i !== dayIdx);
    const newData = {};
    currentT.timeSlots.forEach((_, sIdx) => {
      newData[sIdx] = {};
      newDays.forEach((_, j) => {
        newData[sIdx][j] = currentT.data?.[sIdx]?.[j < dayIdx ? j : j + 1] || null;
      });
    });
    onAddTimetableEntry(student.id, {
      days: newDays,
      timeSlots: currentT.timeSlots,
      data: newData,
    });
  };

  const handleDeleteTimeSlot = (slotIdx) => {
    if (!window.confirm("Delete this time slot and its timetable entries?")) return;
    const currentT = studentTimetable;
    const newTimeSlots = currentT.timeSlots.filter((_, i) => i !== slotIdx);
    const newData = {};
    newTimeSlots.forEach((_, newIdx) => {
      newData[newIdx] = currentT.data[newIdx < slotIdx ? newIdx : newIdx + 1] || {};
    });
    onAddTimetableEntry(student.id, {
      days: currentT.days,
      timeSlots: newTimeSlots,
      data: newData,
    });
  };

  // Activity edit handlers
  const handleEditActivity = (act) => {
    setEditingActivity(act);
    setShowModal("editActivity");
  };

  const handleSaveActivityEdit = () => {
    onUpdateActivity(student.id, editingActivity.id, editingActivity);
    setEditingActivity(null);
    setShowModal(null);
  };

  // Certification edit handlers
  const handleEditCertification = (cert) => {
    setEditingCert(cert);
    setShowModal("editCertification");
  };

  const handleSaveCertificationEdit = () => {
    onUpdateCertification(student.id, editingCert.id, editingCert);
    setEditingCert(null);
    setShowModal(null);
  };

  const styles = {
    container: { maxWidth: 1200, margin: "0 auto" },
    header: { background: "#1a1a2e", padding: "12px 24px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 },
    profileHeader: { background: "#1a1a2e", borderRadius: 20, padding: 32, display: "flex", gap: 28, alignItems: "center", marginBottom: 24, color: "#fff", flexWrap: "wrap" },
    avatar: (color) => ({ width: 88, height: 88, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 32 }),
    tabs: { display: "flex", gap: 10, marginBottom: 24, borderBottom: "2px solid #e0e7ff", flexWrap: "wrap", overflowX: "auto" },
    tab: (active) => ({ padding: "10px 20px", cursor: "pointer", fontWeight: 600, borderBottom: active ? "3px solid #4361ee" : "none", color: active ? "#4361ee" : "#666", background: "none", borderTop: "none", borderLeft: "none", borderRight: "none" }),
    card: { background: "#fff", borderRadius: 16, padding: 20, marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
    cardTitle: { fontSize: 18, fontWeight: 800, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 },
    table: { width: "100%", borderCollapse: "collapse", fontSize: 13, overflowX: "auto" },
    th: { background: "#f8f9ff", padding: 12, textAlign: "left", fontWeight: 600, borderBottom: "2px solid #e0e7ff" },
    td: { padding: "10px 12px", borderBottom: "1px solid #f0f4ff" },
    btn: (variant) => {
      if (variant === "primary") return { background: "#4361ee", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 };
      if (variant === "danger") return { background: "#ef233c", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 };
      return { background: "transparent", color: "#4361ee", border: "2px solid #4361ee", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 };
    },
    smallBtn: { background: "#ef233c", color: "#fff", border: "none", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11 },
    editBtn: { background: "#4361ee", color: "#fff", border: "none", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11, marginRight: 5 },
    formGroup: { marginBottom: 15 },
    label: { display: "block", fontWeight: 600, fontSize: 13, marginBottom: 5 },
    input: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 14, boxSizing: "border-box" },
    select: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 14 },
    statRow: { display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" },
    statBox: { background: "#f8f9ff", borderRadius: 12, padding: 15, minWidth: 150, textAlign: "center" },
    statValue: { fontSize: 28, fontWeight: 800, color: "#4361ee" },
    statLabel: { fontSize: 12, color: "#666" },
    toast: (type) => ({ position: "fixed", bottom: 20, right: 20, background: type === "error" ? "#ef233c" : "#06d6a0", color: "#fff", padding: "12px 20px", borderRadius: 8, zIndex: 1000 }),
    modal: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modalBox: { background: "#fff", borderRadius: 16, padding: 24, width: "90%", maxWidth: 800, maxHeight: "85vh", overflowY: "auto" },
    typeSwitch: { display: "flex", gap: 10, marginBottom: 20, background: "#f0f4ff", borderRadius: 12, padding: 4 },
    typeBtn: (active) => ({ flex: 1, padding: 10, border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, background: active ? "#4361ee" : "transparent", color: active ? "#fff" : "#666" }),
  };

  const ProfileCard = ({ title, value, icon }) => (
    <div style={styles.statBox}><div style={styles.statValue}>{value}</div><div style={styles.statLabel}>{icon} {title}</div></div>
  );

  const renderProfile = () => (
    <div style={styles.card}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}><button style={styles.btn("primary")} onClick={() => setShowModal("editProfile")}>✏️ Edit Profile</button></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 15 }}>
        <div><strong>📧 Email:</strong> {student.email || "—"}</div>
        <div><strong>📱 Phone:</strong> {student.phone || "—"}</div>
        <div><strong>🎂 DOB:</strong> {student.dob || "—"}</div>
        <div><strong>🏫 Department:</strong> {student.dept}</div>
        <div><strong>📍 Address:</strong> {student.address || "—"}</div>
        <div><strong>👨 Father:</strong> {student.fatherName || "—"} ({student.fatherPhone || "—"})</div>
        <div><strong>👩 Mother:</strong> {student.motherName || "—"} ({student.motherPhone || "—"})</div>
        <div><strong>📛 Status:</strong> {student.status}</div>
        <div><strong>🔗 SkillRack Profile:</strong> {student.skillRackProfile ? <a href={student.skillRackProfile} target="_blank" rel="noopener noreferrer">Link</a> : "—"}</div>
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={styles.cardTitle}>Additional Information<button style={styles.btn("primary")} onClick={() => setShowModal("addAdditionalInfo")}>+ Add</button></div>
        {(student.additionalInfo || []).length === 0 ? <div style={{ textAlign: "center", padding: 20, color: "#888" }}>No extra information added.</div> : (
          (student.additionalInfo || []).map((info, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}>
              <div><strong>{info.key}:</strong> {info.value}</div><button style={styles.smallBtn} onClick={() => handleDeleteAdditionalInfo(idx)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderTimetable = () => {
    const { days, timeSlots, data } = studentTimetable;
    if (!days || !timeSlots || days.length === 0 || timeSlots.length === 0) {
      return (
        <div style={styles.card}>
          <div style={styles.cardTitle}>
            📅 Weekly Class Schedule
            <button style={styles.btn("primary")} onClick={openTimetableEditor}>✏️ Edit Timetable</button>
          </div>
          <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
            No timetable structure. Click "Edit Timetable" to set up days and time slots.
          </div>
        </div>
      );
    }
    return (
      <div style={styles.card}>
        <div style={styles.cardTitle}>
          📅 Weekly Class Schedule
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button style={styles.btn("primary")} onClick={openTimetableEditor}>✏️ Edit Timetable</button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ ...styles.table, minWidth: 900, borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ ...styles.th, background: "#f8f9ff", width: 170 }}>Time / Day</th>
                {days.map((day, dIdx) => (
                  <th key={day} style={{ ...styles.th, minWidth: 180 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span>{day}</span>
                      <span style={{ display: "flex", gap: 4 }}>
                        <button type="button" style={{ ...styles.smallBtn, background: "#4361ee" }} onClick={() => openTimetableEditor()} title="Edit day">✏️</button>
                        <button type="button" style={styles.smallBtn} onClick={() => handleDeleteDay(dIdx)} title="Delete day">🗑️</button>
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, sIdx) => (
                <tr key={slot}>
                  <td style={{ ...styles.td, background: "#f8f9ff", minWidth: 170 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                      <strong>{slot}</strong>
                      <span style={{ display: "flex", gap: 4 }}>
                        <button type="button" style={{ ...styles.smallBtn, background: "#4361ee" }} onClick={() => openTimetableEditor()} title="Edit time slot">✏️</button>
                        <button type="button" style={styles.smallBtn} onClick={() => handleDeleteTimeSlot(sIdx)} title="Delete time slot">🗑️</button>
                      </span>
                    </div>
                  </td>
                  {days.map((_, dIdx) => {
                    const entry = data?.[sIdx]?.[dIdx];
                    return (
                      <td key={`${dIdx}-${sIdx}`} style={{ ...styles.td, padding: 16, minWidth: 180, verticalAlign: "top", background: entry ? "#eef6ff" : "#fff", cursor: "pointer" }} onClick={() => openTimetableCellEditor(dIdx, sIdx, entry)}>
                        {entry ? (
                          <div style={{ display: "grid", gap: 4 }}>
                            <div style={{ fontWeight: 700, fontSize: 14 }}>{entry.name}</div>
                            <div style={{ fontSize: 12, color: "#444" }}>{entry.code}</div>
                            <div style={{ fontSize: 12, color: "#555" }}>{entry.venue}</div>
                            <div style={{ fontSize: 12, color: "#777" }}>{entry.faculty}</div>
                          </div>
                        ) : (
                          <span style={{ color: "#888" }}>+ Add entry</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderAttendance = () => (
    <div>
      <div style={styles.statRow}>
        <ProfileCard title="Total Attended" value={totalAttended} icon="📊" />
        <ProfileCard title="Total Conducted" value={totalConducted} icon="📋" />
        <ProfileCard title="Overall Attendance" value={`${overallAttendance}%`} icon="✅" />
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Monthly Attendance<button style={styles.btn("primary")} onClick={() => setShowModal("addAttendance")}>+ Add Month</button></div>
        {Object.keys(studentAttendance).length === 0 ? <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No attendance data</div> : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Month</th>
                  <th style={styles.th}>Attended</th>
                  <th style={styles.th}>Conducted</th>
                  <th style={styles.th}>Percentage</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(studentAttendance).map(([month, data]) => (
                  <tr key={month}>
                    <td style={styles.td}>{month}</td>
                    <td style={styles.td}>{data.attended}</td>
                    <td style={styles.td}>{data.conducted}</td>
                    <td style={styles.td}>{data.percentage}%</td>
                    <td style={styles.td}><button style={styles.editBtn} onClick={() => { setEditingAttendanceMonth(month); setShowModal("editAttendance"); }}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderAcademics = () => {
    return (
      <div style={styles.card}>
        <div style={styles.cardTitle}>
          Course-wise Performance
          <button style={styles.btn("primary")} onClick={() => { loadAcademics(); setShowModal("editAcademics"); }}>✏️ Edit Academics</button>
        </div>
        {studentAcademics.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No courses added. Click Edit to add.</div> : (
          <div>
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>S.No.</th>
                    <th style={styles.th}>Course Code</th>
                    <th style={styles.th}>Course Name</th>
                    <th style={styles.th}>Instructor</th>
                    <th style={styles.th}>Credits</th>
                    <th style={styles.th}>CO Test</th>
                    <th style={styles.th}>CAT I</th>
                    <th style={styles.th}>CAT II</th>
                    <th style={styles.th}>End Sem</th>
                    <th style={styles.th}>Grade</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {studentAcademics.map((c, idx) => (
                    <tr key={c.id}>
                      <td style={styles.td}>{idx + 1}</td>
                      <td style={styles.td}>{c.code}</td>
                      <td style={styles.td}>{c.name}</td>
                      <td style={styles.td}>{c.instructor}</td>
                      <td style={styles.td}>{c.credits}</td>
                      <td style={styles.td}>{c.coTest || 0}</td>
                      <td style={styles.td}>{c.cat1 || 0}</td>
                      <td style={styles.td}>{c.cat2 || 0}</td>
                      <td style={styles.td}>{c.endSem || 0}</td>
                      <td style={styles.td}>{c.grade}</td>
                      <td style={styles.td}>{c.date || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 20, justifyContent: "flex-end" }}><div><strong>CGPA:</strong> {cgpa}</div></div>
          </div>
        )}
      </div>
    );
  };

  const renderActivities = () => (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        Activities
        <button style={styles.btn("primary")} onClick={() => setShowModal("addActivity")}>+ Add Activity</button>
      </div>
      {studentActivities.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No activities recorded</div> : (
        studentActivities.map(act => (
          <div key={act.id} style={{ borderBottom: "1px solid #eee", padding: "12px 0", display: "flex", justifyContent: "space-between" }}>
            <div><strong>{act.title}</strong><br /><small>{act.type} | {act.venue} | {act.date}</small><br /><span style={{ color: "#4361ee" }}>{act.achievement}</span></div>
            <div><button style={styles.editBtn} onClick={() => handleEditActivity(act)}>Edit</button><button style={styles.smallBtn} onClick={() => onDeleteActivity(student.id, act.id)}>Delete</button></div>
          </div>
        ))
      )}
    </div>
  );

  const renderCertifications = () => (
    <div style={styles.card}>
      <div style={styles.cardTitle}>
        Certifications
        <button style={styles.btn("primary")} onClick={() => setShowModal("addCertification")}>+ Add Certification</button>
      </div>
      {studentCerts.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No certifications added</div> : (
        studentCerts.map(cert => (
          <div key={cert.id} style={{ borderBottom: "1px solid #eee", padding: "12px 0", display: "flex", justifyContent: "space-between" }}>
            <div><strong>{cert.name}</strong><br /><small>{cert.duration} | {cert.institute}</small><br /><span style={{ color: "#06d6a0" }}>{cert.remarks}</span></div>
            <div><button style={styles.editBtn} onClick={() => handleEditCertification(cert)}>Edit</button><button style={styles.smallBtn} onClick={() => onDeleteCertification(student.id, cert.id)}>Delete</button></div>
          </div>
        ))
      )}
    </div>
  );

  const renderSkills = () => (
    <div style={styles.card}>
      <div style={styles.cardTitle}>Skills<button style={styles.btn("primary")} onClick={() => setShowModal("editSkills")}>✏️ Edit Skills</button></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <div><div style={{ fontWeight: 600, marginBottom: 5 }}>🏅 Skill Rack Medals</div><div style={{ fontSize: 24, fontWeight: 800, color: "#4361ee" }}>{student.skillRackMedals}</div></div>
        <div><div style={{ fontWeight: 600, marginBottom: 5 }}>🔗 SkillRack Profile</div>{student.skillRackProfile ? <a href={student.skillRackProfile} target="_blank" rel="noopener noreferrer" style={{ color: "#4361ee", wordBreak: "break-all" }}>{student.skillRackProfile}</a> : <span style={{ color: "#888" }}>Not set</span>}</div>
        <div><div style={{ fontWeight: 600, marginBottom: 5 }}>💻 Online Courses</div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 20, fontWeight: 600 }}>{studentOnlineCourses.length}</span><button style={styles.btn("primary")} onClick={() => setShowModal("manageCourses")}>Manage</button></div></div>
      </div>
    </div>
  );

  const renderModules = () => (
    <div>
      {safeModules.map(mod => {
        if (mod.type === "form") {
          const fields = mod.fields || [];
          const key = `${student.id}_${mod.id}`;
          const moduleContent = safeModuleData[key] || {};
          const entries = Array.isArray(moduleContent.entries) ? moduleContent.entries : [];
          return (
            <div key={mod.id} style={styles.card}>
              <div style={styles.cardTitle}>
                {mod.icon} {mod.name}
                <div>
                  <button style={styles.btn("primary")} onClick={() => openModuleStructureEditor(mod)}>✏️ Edit Structure</button>
                  <button style={styles.btn("primary")} onClick={() => setFillModuleId(mod.id)}>+ Add Entry</button>
                </div>
              </div>
              {entries.length === 0 ? <div style={{ textAlign: "center", padding: 20, color: "#888" }}>No data yet</div> : (
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        {fields.map(f => <th key={f.id} style={styles.th}>{f.label}</th>)}
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry, idx) => (
                        <tr key={entry._id || idx}>
                          {fields.map(f => <td key={f.id} style={styles.td}>{entry[f.id] || "—"}</td>)}
                          <td style={styles.td}>{entry._date}</td>
                          <td style={styles.td}><button style={styles.smallBtn} onClick={() => { const newEntries = entries.filter((_, i) => i !== idx); onSaveModuleData(student.id, mod.id, newEntries); }}>Delete</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {fillModuleId === mod.id && (
                <div style={{ marginTop: 20, borderTop: "1px solid #eee", paddingTop: 15 }}>
                  <h4>Add New Entry</h4>
                  {fields.map(f => (
                    <div key={f.id} style={styles.formGroup}>
                      <label style={styles.label}>{f.label}</label>
                      {f.type === "select" ? (
                        <select style={styles.select} value={fillForm[f.id] || ""} onChange={e => setFillForm({ ...fillForm, [f.id]: e.target.value })}>
                          <option value="">Select</option>{f.options.map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                      ) : <input style={styles.input} type={f.type} value={fillForm[f.id] || ""} onChange={e => setFillForm({ ...fillForm, [f.id]: e.target.value })} />}
                    </div>
                  ))}
                  <button style={styles.btn("primary")} onClick={() => handleSaveFormModuleData(mod.id)}>Save Entry</button>
                  <button style={styles.btn("ghost")} onClick={() => { setFillModuleId(null); setFillForm({}); }}>Cancel</button>
                </div>
              )}
            </div>
          );
        } else if (mod.type === "table") {
          const columns = mod.columns || [];
          const key = `${student.id}_${mod.id}`;
          const moduleContent = safeModuleData[key] || {};
          const rows = Array.isArray(moduleContent.rows) ? moduleContent.rows : [];
          return (
            <div key={mod.id} style={styles.card}>
              <div style={styles.cardTitle}>
                {mod.icon} {mod.name}
                <div>
                  <button style={styles.btn("primary")} onClick={() => openModuleStructureEditor(mod)}>✏️ Edit Structure</button>
                  <button style={styles.btn("primary")} onClick={() => setAddRowModuleId(mod.id)}>+ Add Row</button>
                </div>
              </div>
              {rows.length === 0 ? <div style={{ textAlign: "center", padding: 20, color: "#888" }}>No data yet</div> : (
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        {columns.map(col => <th key={col.id} style={styles.th}>{col.label}</th>)}
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map(row => {
                        const isEditing = editingId === row.id;
                        return (
                          <tr key={row.id}>
                            {columns.map(col => (
                              <td key={col.id} style={styles.td}>
                                {isEditing && newRowData[col.id] !== undefined ? (
                                  col.type === "select" ? (
                                    <select style={styles.input} value={newRowData[col.id] || ""} onChange={e => setNewRowData({ ...newRowData, [col.id]: e.target.value })}>
                                      <option value="">Select</option>
                                      {col.options.map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                  ) : (
                                    <input style={styles.input} type={col.type} value={newRowData[col.id] || ""} onChange={e => setNewRowData({ ...newRowData, [col.id]: e.target.value })} />
                                  )
                                ) : (
                                  row[col.id] || "—"
                                )}
                              </td>
                            ))}
                            <td style={styles.td}>{row._date}</td>
                            <td style={styles.td}>
                              {isEditing ? (
                                <>
                                  <button style={styles.editBtn} onClick={() => handleUpdateTableRow(mod.id, row.id, newRowData)}>Save</button>
                                  <button style={styles.smallBtn} onClick={() => { setEditingId(null); setNewRowData({}); }}>Cancel</button>
                                </>
                              ) : (
                                <>
                                  <button style={styles.editBtn} onClick={() => { setEditingId(row.id); setNewRowData(row); }}>Edit</button>
                                  <button style={styles.smallBtn} onClick={() => handleDeleteTableRow(mod.id, row.id)}>Delete</button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {addRowModuleId === mod.id && (
                <div style={{ marginTop: 20, borderTop: "1px solid #eee", paddingTop: 15 }}>
                  <h4>Add New Row</h4>
                  {columns.map(col => (
                    <div key={col.id} style={styles.formGroup}>
                      <label style={styles.label}>{col.label}</label>
                      {col.type === "select" ? (
                        <select style={styles.select} value={newRowData[col.id] || ""} onChange={e => setNewRowData({ ...newRowData, [col.id]: e.target.value })}>
                          <option value="">Select</option>{col.options.map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                      ) : <input style={styles.input} type={col.type} value={newRowData[col.id] || ""} onChange={e => setNewRowData({ ...newRowData, [col.id]: e.target.value })} />}
                    </div>
                  ))}
                  <button style={styles.btn("primary")} onClick={() => handleAddTableRow(mod.id, columns)}>Save Row</button>
                  <button style={styles.btn("ghost")} onClick={() => { setAddRowModuleId(null); setNewRowData({}); }}>Cancel</button>
                </div>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile": return renderProfile();
      case "timetable": return renderTimetable();
      case "attendance": return renderAttendance();
      case "academics": return renderAcademics();
      case "activities": return renderActivities();
      case "certifications": return renderCertifications();
      case "skills": return renderSkills();
      case "modules": return renderModules();
      default: return renderProfile();
    }
  };

  return (
    <>
      <div style={styles.header}>
        <div style={{ fontWeight: "bold" }}>🎓 NEC TMS - Tutor Viewing Student</div>
        <div><button style={{ background: "#4361ee", border: "none", padding: "6px 12px", borderRadius: 6, color: "#fff", cursor: "pointer", marginRight: 10 }} onClick={onBack}>← Back to Dashboard</button><button style={{ background: "#ef233c", border: "none", padding: "6px 12px", borderRadius: 6, color: "#fff", cursor: "pointer" }} onClick={onLogout}>Logout</button></div>
      </div>
      <div style={styles.container}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar(getColor(student.id))}>{getInitials(student.name)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{student.name}</div>
            <div>{student.regNo} · {student.dept} · {student.year} Year</div>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <span style={{ background: "#4cc9f020", color: "#4cc9f0", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>{student.status}</span>
              <span style={{ background: "#06d6a020", color: "#06d6a0", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>CGPA {cgpa}</span>
              <span style={{ background: "#fb850020", color: "#fb8500", padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>Attendance {overallAttendance}%</span>
            </div>
          </div>
        </div>
        <div style={styles.tabs}>
          <button style={styles.tab(activeTab === "profile")} onClick={() => setActiveTab("profile")}>📋 Profile</button>
          <button style={styles.tab(activeTab === "timetable")} onClick={() => setActiveTab("timetable")}>📅 Time Table</button>
          <button style={styles.tab(activeTab === "attendance")} onClick={() => setActiveTab("attendance")}>📊 Attendance</button>
          <button style={styles.tab(activeTab === "academics")} onClick={() => { loadAcademics(); setActiveTab("academics"); }}>📚 Academics</button>
          <button style={styles.tab(activeTab === "activities")} onClick={() => setActiveTab("activities")}>🏆 Activities</button>
          <button style={styles.tab(activeTab === "certifications")} onClick={() => setActiveTab("certifications")}>📜 Certifications</button>
          <button style={styles.tab(activeTab === "skills")} onClick={() => setActiveTab("skills")}>💪 Skills</button>
          <button style={styles.tab(activeTab === "modules")} onClick={() => setActiveTab("modules")}>📦 Modules</button>
        </div>
        {renderContent()}
      </div>

      {/* MODALS (same as before, omitted for brevity but present in full code) */}
      <Modal show={showModal === "addAdditionalInfo"} onClose={() => setShowModal(null)} title="Add Extra Information">
        <div style={styles.formGroup}><label style={styles.label}>Field Name</label><input style={styles.input} value={additionalKey} onChange={(e) => setAdditionalKey(e.target.value)} placeholder="e.g., Blood Group" /></div>
        <div style={styles.formGroup}><label style={styles.label}>Value</label><input style={styles.input} value={additionalValue} onChange={(e) => setAdditionalValue(e.target.value)} placeholder="e.g., O+" /></div>
        <button style={styles.btn("primary")} onClick={handleAddAdditionalInfo}>Add</button>
      </Modal>

      <Modal show={showModal === "editProfile"} onClose={() => setShowModal(null)} title="Edit Student Profile">
        <div style={styles.formGroup}><label style={styles.label}>Full Name</label><input ref={editNameRef} style={styles.input} defaultValue={student.name} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Reg No</label><input ref={editRegNoRef} style={styles.input} defaultValue={student.regNo} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Phone</label><input ref={editPhoneRef} style={styles.input} defaultValue={student.phone} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Email</label><input ref={editEmailRef} style={styles.input} defaultValue={student.email} /></div>
        <div style={styles.formGroup}><label style={styles.label}>DOB</label><input ref={editDobRef} style={styles.input} type="date" defaultValue={student.dob} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Dept</label><select ref={editDeptRef} style={styles.select} defaultValue={student.dept}><option>CSE</option><option>ECE</option><option>EEE</option><option>MECH</option></select></div>
        <div style={styles.formGroup}><label style={styles.label}>Year</label><select ref={editYearRef} style={styles.select} defaultValue={student.year}><option>1st</option><option>2nd</option><option>3rd</option><option>4th</option></select></div>
        <div style={styles.formGroup}><label style={styles.label}>CGPA</label><input ref={editCgpaRef} style={styles.input} type="number" step="0.1" defaultValue={student.cgpa} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Address</label><input ref={editAddressRef} style={styles.input} defaultValue={student.address} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Father's Name</label><input ref={editFatherNameRef} style={styles.input} defaultValue={student.fatherName} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Father's Phone</label><input ref={editFatherPhoneRef} style={styles.input} defaultValue={student.fatherPhone} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Mother's Name</label><input ref={editMotherNameRef} style={styles.input} defaultValue={student.motherName} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Mother's Phone</label><input ref={editMotherPhoneRef} style={styles.input} defaultValue={student.motherPhone} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Status</label><select ref={editStatusRef} style={styles.select} defaultValue={student.status}><option>Active</option><option>Inactive</option></select></div>
        <div style={styles.formGroup}><label style={styles.label}>Password</label><div style={styles.inputContainer}><input ref={editPasswordRef} type={showPassword ? "text" : "password"} style={styles.input} defaultValue={student.password} /><button style={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>{showPassword ? "👁️" : "👁️‍🗨️"}</button></div></div>
        <div style={styles.formGroup}><label style={styles.label}>SkillRack Profile URL</label><input ref={editSkillRackProfileRef} style={styles.input} defaultValue={student.skillRackProfile} placeholder="https://skillrack.com/..." /></div>
        <button style={styles.btn("primary")} onClick={handleUpdateProfile}>Save Changes</button>
      </Modal>

      <Modal show={showModal === "editAttendance"} onClose={() => setShowModal(null)} title={`Edit Attendance - ${editingAttendanceMonth}`}>
        <div style={styles.formGroup}><label style={styles.label}>Attended</label><input ref={editAttendedRef} style={styles.input} type="number" defaultValue={editingAttendanceMonth ? studentAttendance[editingAttendanceMonth]?.attended : 0} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Conducted</label><input ref={editConductedRef} style={styles.input} type="number" defaultValue={editingAttendanceMonth ? studentAttendance[editingAttendanceMonth]?.conducted : 0} /></div>
        <button style={styles.btn("primary")} onClick={() => handleUpdateAttendance(editingAttendanceMonth)}>Save</button>
      </Modal>

      <Modal show={showModal === "addAttendance"} onClose={() => setShowModal(null)} title="Add Monthly Attendance">
        <div style={styles.formGroup}><label style={styles.label}>Month</label><input ref={monthRef} style={styles.input} placeholder="e.g., October" /></div>
        <div style={styles.formGroup}><label style={styles.label}>Attended</label><input ref={attendedRef} style={styles.input} type="number" /></div>
        <div style={styles.formGroup}><label style={styles.label}>Conducted</label><input ref={conductedRef} style={styles.input} type="number" /></div>
        <button style={styles.btn("primary")} onClick={handleAddAttendance}>Save</button>
      </Modal>

      <Modal show={showModal === "editSkills"} onClose={() => setShowModal(null)} title="Edit Skills">
        <div style={styles.formGroup}><label style={styles.label}>Skill Rack Medals</label><input ref={skillRackMedalsRef} style={styles.input} type="number" defaultValue={student.skillRackMedals} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Online Courses (count)</label><input ref={onlineCoursesRef} style={styles.input} type="number" defaultValue={studentOnlineCourses.length} /></div>
        <button style={styles.btn("primary")} onClick={handleUpdateSkills}>Save Skills</button>
      </Modal>

      <Modal show={showModal === "manageCourses"} onClose={() => { setShowModal(null); setEditingOnlineCourseId(null); setNewCourseNameManager(""); setNewCourseStatusManager("In Progress"); }} title="Manage Online Courses">
        <div style={{ marginBottom: 16, display: "flex", gap: 10 }}>
          <input style={{ ...styles.input, flex: 1 }} placeholder="Course Name" value={newCourseNameManager} onChange={e => setNewCourseNameManager(e.target.value)} />
          <select style={{ ...styles.select, width: 180 }} value={newCourseStatusManager} onChange={e => setNewCourseStatusManager(e.target.value)}><option>In Progress</option><option>Completed</option><option>Not Started</option></select>
          <button style={styles.btn("primary")} onClick={handleAddOnlineCourse}>{editingOnlineCourseId ? "Save" : "Add"}</button>
        </div>
        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          {studentOnlineCourses.map(course => (
            <div key={course.id} style={{ borderBottom: "1px solid #eee", padding: "8px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><strong>{course.name}</strong> – {course.status}</div>
              <div>
                <button style={styles.editBtn} onClick={() => { setEditingOnlineCourseId(course.id); setNewCourseNameManager(course.name); setNewCourseStatusManager(course.status); }}>Edit</button>
                <button style={styles.smallBtn} onClick={() => handleDeleteOnlineCourse(course.id)}>Delete</button>
              </div>
            </div>
          ))}
          {studentOnlineCourses.length === 0 && <div style={{ textAlign: "center", padding: 20, color: "#888" }}>No courses added yet.</div>}
        </div>
      </Modal>

      <Modal show={showModal === "addActivity"} onClose={() => setShowModal(null)} title="Add Activity">
        <div style={styles.formGroup}><label style={styles.label}>Type</label><select ref={activityTypeRef} style={styles.select}><option>Intra College</option><option>Inter College</option><option>Workshop</option><option>Seminar</option></select></div>
        <div style={styles.formGroup}><label style={styles.label}>Venue</label><input ref={activityVenueRef} style={styles.input} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Title</label><input ref={activityTitleRef} style={styles.input} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Date</label><input ref={activityDateRef} style={styles.input} type="date" /></div>
        <div style={styles.formGroup}><label style={styles.label}>Achievement</label><input ref={activityAchievementRef} style={styles.input} placeholder="e.g., First Place" /></div>
        <button style={styles.btn("primary")} onClick={() => { const newAct = { id: Date.now(), type: activityTypeRef.current?.value, venue: activityVenueRef.current?.value, title: activityTitleRef.current?.value, date: activityDateRef.current?.value, achievement: activityAchievementRef.current?.value }; if (newAct.title) { onAddActivity(student.id, newAct); setShowModal(null); } }}>Add Activity</button>
      </Modal>

      <Modal show={showModal === "editActivity"} onClose={() => setShowModal(null)} title="Edit Activity">
        {editingActivity && (
          <>
            <div style={styles.formGroup}><label style={styles.label}>Type</label><select style={styles.select} value={editingActivity.type} onChange={e => setEditingActivity({ ...editingActivity, type: e.target.value })}><option>Intra College</option><option>Inter College</option><option>Workshop</option><option>Seminar</option></select></div>
            <div style={styles.formGroup}><label style={styles.label}>Venue</label><input style={styles.input} value={editingActivity.venue} onChange={e => setEditingActivity({ ...editingActivity, venue: e.target.value })} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Title</label><input style={styles.input} value={editingActivity.title} onChange={e => setEditingActivity({ ...editingActivity, title: e.target.value })} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Date</label><input style={styles.input} type="date" value={editingActivity.date} onChange={e => setEditingActivity({ ...editingActivity, date: e.target.value })} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Achievement</label><input style={styles.input} value={editingActivity.achievement} onChange={e => setEditingActivity({ ...editingActivity, achievement: e.target.value })} /></div>
            <button style={styles.btn("primary")} onClick={handleSaveActivityEdit}>Save</button>
          </>
        )}
      </Modal>

      <Modal show={showModal === "addCertification"} onClose={() => setShowModal(null)} title="Add Certification">
        <div style={styles.formGroup}><label style={styles.label}>Name</label><input ref={certNameRef} style={styles.input} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Duration</label><input ref={certDurationRef} style={styles.input} placeholder="e.g., 6 Weeks" /></div>
        <div style={styles.formGroup}><label style={styles.label}>Institute</label><input ref={certInstituteRef} style={styles.input} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Remarks</label><input ref={certRemarksRef} style={styles.input} /></div>
        <button style={styles.btn("primary")} onClick={() => { const newCert = { id: Date.now(), name: certNameRef.current?.value, duration: certDurationRef.current?.value, institute: certInstituteRef.current?.value, remarks: certRemarksRef.current?.value }; if (newCert.name) { onAddCertification(student.id, newCert); setShowModal(null); } }}>Add Certification</button>
      </Modal>

      <Modal show={showModal === "editCertification"} onClose={() => setShowModal(null)} title="Edit Certification">
        {editingCert && (
          <>
            <div style={styles.formGroup}><label style={styles.label}>Name</label><input style={styles.input} value={editingCert.name} onChange={e => setEditingCert({ ...editingCert, name: e.target.value })} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Duration</label><input style={styles.input} value={editingCert.duration} onChange={e => setEditingCert({ ...editingCert, duration: e.target.value })} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Institute</label><input style={styles.input} value={editingCert.institute} onChange={e => setEditingCert({ ...editingCert, institute: e.target.value })} /></div>
            <div style={styles.formGroup}><label style={styles.label}>Remarks</label><input style={styles.input} value={editingCert.remarks} onChange={e => setEditingCert({ ...editingCert, remarks: e.target.value })} /></div>
            <button style={styles.btn("primary")} onClick={handleSaveCertificationEdit}>Save</button>
          </>
        )}
      </Modal>

      <Modal show={showModal === "editTimetableStructure"} onClose={() => setShowModal(null)} title="Edit Timetable Structure (Days & Time Slots)">
        {timetableStruct && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h4>Days</h4>
              {timetableStruct.days.map((day, idx) => (
                <div key={idx} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <input style={styles.input} value={day} onChange={e => handleEditDay(idx, e.target.value)} />
                  <button style={styles.smallBtn} onClick={() => handleRemoveDay(idx)}>Remove</button>
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <input style={styles.input} placeholder="New day" value={newDay} onChange={e => setNewDay(e.target.value)} />
                <button style={styles.btn("primary")} onClick={handleAddDay}>Add Day</button>
              </div>
            </div>
            <div>
              <h4>Time Slots</h4>
              {timetableStruct.timeSlots.map((slot, idx) => (
                <div key={idx} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <input style={styles.input} value={slot} onChange={e => handleEditTimeSlot(idx, e.target.value)} />
                  <button style={styles.smallBtn} onClick={() => handleRemoveTimeSlot(idx)}>Remove</button>
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <input style={styles.input} placeholder="New time slot (e.g., 16:00-17:00)" value={newTimeSlot} onChange={e => setNewTimeSlot(e.target.value)} />
                <button style={styles.btn("primary")} onClick={handleAddTimeSlot}>Add Time Slot</button>
              </div>
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button style={styles.btn("primary")} onClick={saveTimetableStructure}>Save Structure</button>
              <button style={styles.btn("ghost")} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal show={showModal === "editTimetableCell"} onClose={() => setShowModal(null)} title="Edit Timetable Entry">
        <div style={styles.formGroup}><label style={styles.label}>Course Code</label><input style={styles.input} value={timetableCellForm.code} onChange={e => setTimetableCellForm({ ...timetableCellForm, code: e.target.value })} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Course Name</label><input style={styles.input} value={timetableCellForm.name} onChange={e => setTimetableCellForm({ ...timetableCellForm, name: e.target.value })} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Venue</label><input style={styles.input} value={timetableCellForm.venue} onChange={e => setTimetableCellForm({ ...timetableCellForm, venue: e.target.value })} /></div>
        <div style={styles.formGroup}><label style={styles.label}>Faculty</label><input style={styles.input} value={timetableCellForm.faculty} onChange={e => setTimetableCellForm({ ...timetableCellForm, faculty: e.target.value })} /></div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={styles.btn("primary")} onClick={saveTimetableCell}>Save</button>
          <button style={styles.btn("ghost")} onClick={() => setShowModal(null)}>Cancel</button>
        </div>
      </Modal>

      <Modal show={showModal === "editAcademics"} onClose={() => setShowModal(null)} title="Edit Academics (Courses)">
        <div style={{ overflowX: "auto", marginBottom: 20 }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Course Code</th><th style={styles.th}>Course Name</th><th style={styles.th}>Instructor</th>
                <th style={styles.th}>Credits</th><th style={styles.th}>CO Test</th><th style={styles.th}>CAT I</th>
                <th style={styles.th}>CAT II</th><th style={styles.th}>End Sem</th><th style={styles.th}>Grade</th><th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {acadCourses.map(course => (
                <tr key={course.id}>
                  <td style={styles.td}><input style={styles.input} value={course.code} onChange={e => handleUpdateCourse(course.id, "code", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} value={course.name} onChange={e => handleUpdateCourse(course.id, "name", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} value={course.instructor} onChange={e => handleUpdateCourse(course.id, "instructor", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} type="number" step="any" value={course.credits} onChange={e => handleUpdateCourse(course.id, "credits", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} type="number" value={course.coTest} onChange={e => handleUpdateCourse(course.id, "coTest", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} type="number" value={course.cat1} onChange={e => handleUpdateCourse(course.id, "cat1", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} type="number" value={course.cat2} onChange={e => handleUpdateCourse(course.id, "cat2", e.target.value)} /></td>
                  <td style={styles.td}><input style={styles.input} type="number" value={course.endSem} onChange={e => handleUpdateCourse(course.id, "endSem", e.target.value)} /></td>
                  <td style={styles.td}>
                    <select style={styles.select} value={course.grade} onChange={e => handleUpdateCourse(course.id, "grade", e.target.value)}>
                      <option>O</option><option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option><option>D</option><option>E</option><option>F</option>
                    </select>
                  </td>
                  <td style={styles.td}><button style={styles.smallBtn} onClick={() => handleDeleteCourse(course.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginBottom: 15 }}>
          <h4>Add New Course</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            <input style={styles.input} placeholder="Course Code" value={newCourseData.code} onChange={e => setNewCourseData({ ...newCourseData, code: e.target.value })} />
            <input style={styles.input} placeholder="Course Name" value={newCourseData.name} onChange={e => setNewCourseData({ ...newCourseData, name: e.target.value })} />
            <input style={styles.input} placeholder="Instructor" value={newCourseData.instructor} onChange={e => setNewCourseData({ ...newCourseData, instructor: e.target.value })} />
            <input style={styles.input} type="number" step="any" placeholder="Credits" value={newCourseData.credits} onChange={e => setNewCourseData({ ...newCourseData, credits: e.target.value })} />
            <input style={styles.input} type="number" placeholder="CO Test" value={newCourseData.coTest} onChange={e => setNewCourseData({ ...newCourseData, coTest: e.target.value })} />
            <input style={styles.input} type="number" placeholder="CAT I" value={newCourseData.cat1} onChange={e => setNewCourseData({ ...newCourseData, cat1: e.target.value })} />
            <input style={styles.input} type="number" placeholder="CAT II" value={newCourseData.cat2} onChange={e => setNewCourseData({ ...newCourseData, cat2: e.target.value })} />
            <input style={styles.input} type="number" placeholder="End Sem" value={newCourseData.endSem} onChange={e => setNewCourseData({ ...newCourseData, endSem: e.target.value })} />
            <select style={styles.select} value={newCourseData.grade} onChange={e => setNewCourseData({ ...newCourseData, grade: e.target.value })}>
              <option>O</option><option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option><option>D</option><option>E</option><option>F</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={styles.btn("primary")} onClick={handleAddCourse}>Add Course</button>
          <button style={styles.btn("primary")} onClick={saveAcademics}>Save All Changes</button>
          <button style={styles.btn("ghost")} onClick={() => setShowModal(null)}>Cancel</button>
        </div>
      </Modal>

      {/* Module Structure Editor Modal */}
      <Modal show={showModal === "editModuleStructure"} onClose={() => setShowModal(false)} title={`Edit Module Structure: ${editingModuleStruct?.name || ""}`}>
        {editingModuleStruct && (
          <>
            <div style={styles.typeSwitch}>
              <button style={styles.typeBtn(moduleStructType === "form")} onClick={() => { setModuleStructType("form"); setModuleStructColumns([]); }}>📝 Form Fields</button>
              <button style={styles.typeBtn(moduleStructType === "table")} onClick={() => { setModuleStructType("table"); setModuleStructFields([]); }}>📊 Table Columns</button>
            </div>
            {moduleStructType === "form" ? (
              <>
                <div style={{ fontWeight: 700, marginBottom: 12 }}>Form Fields</div>
                {moduleStructFields.map(f => (
                  <div key={f.id} style={{ background: "#f0f4ff", padding: 8, borderRadius: 6, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                    <span>{f.label} ({f.type})</span>
                    <button style={styles.deleteBtn} onClick={() => handleRemoveStructField(f.id)}>X</button>
                  </div>
                ))}
                <div style={{ background: "#f8f9ff", padding: 15, borderRadius: 12, marginTop: 12 }}>
                  <div><strong>Add Field</strong></div>
                  <input ref={structFieldLabelRef} style={styles.input} placeholder="Field Label" />
                  <select style={styles.select} value={structTempFieldType} onChange={(e) => setStructTempFieldType(e.target.value)}><option>text</option><option>number</option><option>date</option><option>select</option></select>
                  {structTempFieldType === "select" && <input ref={structFieldOptionsRef} style={styles.input} placeholder="Options (comma separated)" />}
                  <button style={styles.btn("primary")} onClick={handleAddStructField}>+ Add Field</button>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontWeight: 700, marginBottom: 12 }}>Table Columns (Headers)</div>
                {moduleStructColumns.map(col => (
                  <div key={col.id} style={{ background: "#f0f4ff", padding: 8, borderRadius: 6, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                    <span>{col.label} ({col.type})</span>
                    <button style={styles.deleteBtn} onClick={() => handleRemoveStructColumn(col.id)}>X</button>
                  </div>
                ))}
                <div style={{ background: "#f8f9ff", padding: 15, borderRadius: 12, marginTop: 12 }}>
                  <div><strong>Add Column</strong></div>
                  <input style={styles.input} placeholder="Column Label (e.g., Subject Name)" value={structTempColumnLabel} onChange={(e) => setStructTempColumnLabel(e.target.value)} />
                  <select style={styles.select} value={structTempColumnType} onChange={(e) => setStructTempColumnType(e.target.value)}><option>text</option><option>number</option><option>date</option><option>select</option></select>
                  {structTempColumnType === "select" && <input style={styles.input} placeholder="Options (comma separated)" value={structTempColumnOptions} onChange={(e) => setStructTempColumnOptions(e.target.value)} />}
                  <button style={styles.btn("primary")} onClick={handleAddStructColumn}>+ Add Column</button>
                </div>
              </>
            )}
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button style={styles.btn("primary")} onClick={saveModuleStructureEdit}>Save Structure Changes</button>
              <button style={styles.btn("ghost")} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </>
        )}
      </Modal>

      {toast && <div style={styles.toast(toast.type)}>{toast.msg}</div>}
    </>
  );
}

// ============================================================
// 8. MAIN APP COMPONENT
// ============================================================

function TMS() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [tutors, setTutors] = useState(INITIAL_TUTORS);
  const [students, setStudents] = useState(() => INITIAL_STUDENTS.map(s => ({
    ...s,
    fatherName: s.fatherName || s.parentName || "",
    fatherPhone: s.fatherPhone || s.parentPhone || "",
    motherName: s.motherName || "",
    motherPhone: s.motherPhone || "",
    additionalInfo: s.additionalInfo || [],
    academics: s.academics || [],
  })));
  const [modules, setModules] = useState(INITIAL_MODULES);
  const [moduleData, setModuleData] = useState(INITIAL_MODULE_DATA);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [certifications, setCertifications] = useState(INITIAL_CERTIFICATIONS);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [timetable, setTimetable] = useState(INITIAL_TIMETABLE);
  const [toast, setToast] = useState(null);
  const [showFirstTimePassword, setShowFirstTimePassword] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentView, setShowStudentView] = useState(false);
  const [showStudentSignUp, setShowStudentSignUp] = useState(false);
  const [showTutorSignUp, setShowTutorSignUp] = useState(false);
  const [forgotPasswordRole, setForgotPasswordRole] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("tms_all_data");
    if (saved) {
      const data = JSON.parse(saved);
      const migratedStudents = (data.students || INITIAL_STUDENTS).map(s => ({
        ...s,
        fatherName: s.fatherName || s.parentName || "",
        fatherPhone: s.fatherPhone || s.parentPhone || "",
        motherName: s.motherName || "",
        motherPhone: s.motherPhone || "",
        additionalInfo: s.additionalInfo || [],
        academics: s.academics || [],
      }));
      setStudents(migratedStudents);
      setModules(data.modules || INITIAL_MODULES);
      setModuleData(data.moduleData || INITIAL_MODULE_DATA);
      setAttendance(data.attendance || INITIAL_ATTENDANCE);
      setActivities(data.activities || INITIAL_ACTIVITIES);
      setCertifications(data.certifications || INITIAL_CERTIFICATIONS);
      setSkills(data.skills || INITIAL_SKILLS);
      setTimetable(data.timetable || INITIAL_TIMETABLE);
      setTutors(data.tutors || INITIAL_TUTORS);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("tms_all_data", JSON.stringify({
        students, modules, moduleData, attendance, activities, certifications,
        skills, timetable, tutors,
      }));
    }
  }, [students, modules, moduleData, attendance, activities, certifications, skills, timetable, tutors, isLoggedIn]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleLogin = (userData) => {
    if (userData.isFirstLogin) {
      setPendingUser(userData);
      setShowFirstTimePassword(true);
    } else {
      setUser(userData);
      setIsLoggedIn(true);
    }
  };

  const handleFirstTimePasswordSave = (newPassword) => {
    if (pendingUser.role === "student") {
      setStudents(students.map(s => s.id === pendingUser.id ? { ...s, password: newPassword, isFirstLogin: false } : s));
    } else {
      setTutors(tutors.map(t => t.id === pendingUser.id ? { ...t, password: newPassword, isFirstLogin: false } : t));
    }
    setUser({ ...pendingUser, isFirstLogin: false });
    setIsLoggedIn(true);
    setShowFirstTimePassword(false);
    setPendingUser(null);
    showToast("Password changed successfully!");
  };

  const handleChangeTutorPassword = (tutorId, newPassword) => {
    setTutors(tutors.map(t => t.id === tutorId ? { ...t, password: newPassword } : t));
    showToast("Password changed successfully!");
  };

  const handleChangeStudentPassword = (userId, newPassword) => {
    setStudents(students.map(s => s.id === userId ? { ...s, password: newPassword } : s));
    showToast("Password changed successfully!");
  };

  const handleForgotPassword = (role, identifier, newPassword) => {
    const normalizedIdentifier = String(identifier || "").trim();
    if (role === "student") {
      const studentIndex = students.findIndex(s => String(s.regNo || "").trim() === normalizedIdentifier);
      if (studentIndex === -1) { showToast("Student not found", "error"); return; }
      const updated = [...students];
      updated[studentIndex] = { ...updated[studentIndex], password: newPassword };
      setStudents(updated);
      showToast("Password reset successfully! Please login.");
    } else {
      const tutorIndex = tutors.findIndex(t => String(t.id || "").trim() === normalizedIdentifier || String(t.email || "").trim().toLowerCase() === normalizedIdentifier.toLowerCase());
      if (tutorIndex === -1) { showToast("Tutor not found", "error"); return; }
      const updated = [...tutors];
      updated[tutorIndex] = { ...updated[tutorIndex], password: newPassword };
      setTutors(updated);
      showToast("Password reset successfully! Please login.");
    }
    setForgotPasswordRole(null);
  };

  const handleAddStudent = (student) => {
    setStudents([...students, student]);
    showToast("Student added!");
  };

  const handleUpdateStudent = (studentId, updatedData) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, ...updatedData } : s));
    showToast("Student updated!");
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    showToast("Student deleted", "error");
  };

  const handleAddModule = (module) => {
    setModules([...modules, module]);
    showToast("Module created!");
  };

  const handleEditModule = (updatedModule) => {
    const oldModule = modules.find(m => m.id === updatedModule.id);
    setModules(modules.map(m => m.id === updatedModule.id ? updatedModule : m));
    
    // Migrate existing data when module structure changes
    if (oldModule && oldModule.type === updatedModule.type) {
      if (updatedModule.type === "form") {
        const oldFieldIds = oldModule.fields.map(f => f.id);
        const newFieldIds = updatedModule.fields.map(f => f.id);
        const addedFields = updatedModule.fields.filter(f => !oldFieldIds.includes(f.id));
        const removedFieldIds = oldFieldIds.filter(id => !newFieldIds.includes(id));
        
        if (addedFields.length || removedFieldIds.length) {
          const newModuleData = { ...moduleData };
          Object.keys(newModuleData).forEach(key => {
            if (key.endsWith(`_${updatedModule.id}`)) {
              const entries = newModuleData[key].entries || [];
              const updatedEntries = entries.map(entry => {
                const newEntry = { ...entry, _date: entry._date, _id: entry._id };
                addedFields.forEach(field => { newEntry[field.id] = ""; });
                removedFieldIds.forEach(id => { delete newEntry[id]; });
                return newEntry;
              });
              newModuleData[key] = { entries: updatedEntries };
            }
          });
          setModuleData(newModuleData);
        }
      } else if (updatedModule.type === "table") {
        const oldColIds = oldModule.columns.map(c => c.id);
        const newColIds = updatedModule.columns.map(c => c.id);
        const addedCols = updatedModule.columns.filter(c => !oldColIds.includes(c.id));
        const removedColIds = oldColIds.filter(id => !newColIds.includes(id));
        
        if (addedCols.length || removedColIds.length) {
          const newModuleData = { ...moduleData };
          Object.keys(newModuleData).forEach(key => {
            if (key.endsWith(`_${updatedModule.id}`)) {
              const rows = newModuleData[key].rows || [];
              const updatedRows = rows.map(row => {
                const newRow = { ...row, _date: row._date, id: row.id };
                addedCols.forEach(col => { newRow[col.id] = ""; });
                removedColIds.forEach(id => { delete newRow[id]; });
                return newRow;
              });
              newModuleData[key] = { rows: updatedRows };
            }
          });
          setModuleData(newModuleData);
        }
      }
    }
    showToast("Module updated!");
  };

  const handleDeleteModule = (moduleId) => {
    setModules(modules.filter(m => m.id !== moduleId));
    const newModuleData = { ...moduleData };
    Object.keys(newModuleData).forEach(key => { if (key.includes(`_${moduleId}`)) delete newModuleData[key]; });
    setModuleData(newModuleData);
    showToast("Module deleted", "error");
  };

  const handleSaveModuleData = (studentId, moduleId, entries) => {
    setModuleData(prev => ({ ...prev, [`${studentId}_${moduleId}`]: { ...prev[`${studentId}_${moduleId}`], entries } }));
    showToast("Data saved!");
  };

  const handleSaveTableRowData = (studentId, moduleId, rows) => {
    setModuleData(prev => ({ ...prev, [`${studentId}_${moduleId}`]: { ...prev[`${studentId}_${moduleId}`], rows } }));
    showToast("Table data saved!");
  };

  const handleDeleteTableRowData = (studentId, moduleId, rows) => {
    setModuleData(prev => ({ ...prev, [`${studentId}_${moduleId}`]: { ...prev[`${studentId}_${moduleId}`], rows } }));
    showToast("Row deleted", "error");
  };

  const handleSaveAttendance = (studentId, month, data) => {
    setAttendance(prev => ({ ...prev, [studentId]: { ...(prev[studentId] || {}), [month]: data } }));
    showToast("Attendance updated!");
  };

  const handleAddActivity = (studentId, activity) => {
    setActivities(prev => ({ ...prev, [studentId]: [...(prev[studentId] || []), activity] }));
    showToast("Activity added!");
  };

  const handleUpdateActivity = (studentId, activityId, updatedActivity) => {
    setActivities(prev => ({
      ...prev,
      [studentId]: prev[studentId].map(a => a.id === activityId ? updatedActivity : a),
    }));
    showToast("Activity updated!");
  };

  const handleDeleteActivity = (studentId, id) => {
    setActivities(prev => ({ ...prev, [studentId]: prev[studentId].filter(a => a.id !== id) }));
    showToast("Activity deleted", "error");
  };

  const handleAddCertification = (studentId, cert) => {
    setCertifications(prev => ({ ...prev, [studentId]: [...(prev[studentId] || []), cert] }));
    showToast("Certification added!");
  };

  const handleUpdateCertification = (studentId, certId, updatedCert) => {
    setCertifications(prev => ({
      ...prev,
      [studentId]: prev[studentId].map(c => c.id === certId ? updatedCert : c),
    }));
    showToast("Certification updated!");
  };

  const handleDeleteCertification = (studentId, id) => {
    setCertifications(prev => ({ ...prev, [studentId]: prev[studentId].filter(c => c.id !== id) }));
    showToast("Certification deleted", "error");
  };

  const handleUpdateSkills = (studentId, updatedSkills) => {
    setSkills(prev => ({ ...prev, [studentId]: updatedSkills }));
    const student = students.find(s => s.id === studentId);
    if (student) handleUpdateStudent(studentId, { skillRackMedals: updatedSkills.skillRackMedals });
    showToast("Skills updated!");
  };

  const handleAddTimetableEntry = (studentId, updatedTimetable) => {
    setTimetable(prev => ({ ...prev, [studentId]: updatedTimetable }));
    showToast("Timetable updated!");
  };

  const handleDeleteTimetableEntry = (studentId, updatedTimetable) => {
    setTimetable(prev => ({ ...prev, [studentId]: updatedTimetable }));
    showToast("Timetable updated!");
  };

  const handleAddOnlineCourse = (studentId, course) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, onlineCoursesList: [...(s.onlineCoursesList || []), course] } : s));
    showToast("Online course added!");
  };

  const handleDeleteOnlineCourse = (studentId, courseId) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, onlineCoursesList: (s.onlineCoursesList || []).filter(c => c.id !== courseId) } : s));
    showToast("Online course deleted", "error");
  };

  const handleUpdateOnlineCourse = (studentId, updatedCourse) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, onlineCoursesList: (s.onlineCoursesList || []).map(c => c.id === updatedCourse.id ? { ...c, ...updatedCourse } : c) } : s));
    showToast("Online course updated!");
  };

  const handleStudentSignUp = (newStudent) => {
    setStudents([...students, newStudent]);
    showToast("Student account created! Please log in.");
    setShowStudentSignUp(false);
  };

  const handleTutorSignUp = (newTutor) => {
    setTutors([...tutors, newTutor]);
    showToast("Tutor account created! Please log in.");
    setShowTutorSignUp(false);
  };

  if (!isLoggedIn) {
    if (showFirstTimePassword) return <ChangePasswordModal onClose={() => { setShowFirstTimePassword(false); setPendingUser(null); }} onSave={handleFirstTimePasswordSave} isFirstLogin={true} />;
    if (showStudentSignUp) return <StudentSignUp onSignUp={handleStudentSignUp} onBackToLogin={() => setShowStudentSignUp(false)} />;
    if (showTutorSignUp) return <TutorSignUp onSignUp={handleTutorSignUp} onBackToLogin={() => setShowTutorSignUp(false)} />;
    if (forgotPasswordRole) return <ForgotPasswordModal role={forgotPasswordRole} onReset={handleForgotPassword} onClose={() => setForgotPasswordRole(null)} />;
    return <Login onLogin={handleLogin} tutors={tutors} students={students} onForgotPassword={(role) => setForgotPasswordRole(role)} onStudentSignUp={() => setShowStudentSignUp(true)} onTutorSignUp={() => setShowTutorSignUp(true)} />;
  }

  if (user.role === "student") {
    const studentData = students.find(s => s.id === user.id);
    if (!studentData) return <div>Student not found</div>;
    return (
      <StudentDashboard
        student={studentData}
        attendance={attendance}
        activities={activities}
        certifications={certifications}
        timetable={timetable}
        modules={modules}
        moduleData={moduleData}
        onUpdateStudent={handleUpdateStudent}
        onAddOnlineCourse={handleAddOnlineCourse}
        onDeleteOnlineCourse={handleDeleteOnlineCourse}
        onUpdateOnlineCourse={handleUpdateOnlineCourse}
        onAddCertification={handleAddCertification}
        onDeleteCertification={handleDeleteCertification}
        onUpdateCertification={handleUpdateCertification}
        onLogout={() => { setIsLoggedIn(false); setUser(null); }}
        toast={toast}
      />
    );
  }

  if (showStudentView && selectedStudent) {
    const latestStudent = students.find(s => s.id === selectedStudent.id) || selectedStudent;
    if (!latestStudent) return <div>Student not found</div>;
    return (
      <TutorStudentView
        student={latestStudent}
        attendance={attendance}
        activities={activities}
        certifications={certifications}
        skills={skills}
        timetable={timetable}
        modules={modules}
        moduleData={moduleData}
        onSaveAttendance={handleSaveAttendance}
        onAddActivity={handleAddActivity}
        onDeleteActivity={handleDeleteActivity}
        onUpdateActivity={handleUpdateActivity}
        onAddCertification={handleAddCertification}
        onDeleteCertification={handleDeleteCertification}
        onUpdateCertification={handleUpdateCertification}
        onUpdateStudent={handleUpdateStudent}
        onChangePassword={handleChangeStudentPassword}
        onUpdateSkills={handleUpdateSkills}
        onAddTimetableEntry={handleAddTimetableEntry}
        onDeleteTimetableEntry={handleDeleteTimetableEntry}
        onSaveModuleData={handleSaveModuleData}
        onSaveTableRowData={handleSaveTableRowData}
        onDeleteTableRowData={handleDeleteTableRowData}
        onAddOnlineCourse={handleAddOnlineCourse}
        onDeleteOnlineCourse={handleDeleteOnlineCourse}
        onUpdateOnlineCourse={handleUpdateOnlineCourse}
        onEditModule={handleEditModule}
        onBack={() => setShowStudentView(false)}
        onLogout={() => { setIsLoggedIn(false); setUser(null); }}
        toast={toast}
      />
    );
  }

  const currentTutor = tutors.find(t => t.id === user.id);
  if (!currentTutor) return <div>Tutor not found</div>;

  return (
    <TutorDashboard
      students={students}
      modules={modules}
      onAddStudent={handleAddStudent}
      onDeleteStudent={handleDeleteStudent}
      onAddModule={handleAddModule}
      onEditModule={handleEditModule}
      onDeleteModule={handleDeleteModule}
      onViewStudent={(s) => { setSelectedStudent(s); setShowStudentView(true); }}
      onLogout={() => { setIsLoggedIn(false); setUser(null); }}
      tutor={currentTutor}
      onChangeTutorPassword={(newPassword) => handleChangeTutorPassword(currentTutor.id, newPassword)}
      toast={toast}
    />
  );
}

window.TMS = TMS;
export default TMS;

const rootElement = document.getElementById("root");
if (rootElement && window.ReactDOM) {
  ReactDOM.createRoot(rootElement).render(React.createElement(TMS));
}
