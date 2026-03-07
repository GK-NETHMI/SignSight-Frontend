import Navbar from "../../components/kaveesha/Navbar";
import PrimaryButton from "../../components/kaveesha/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, query, collection, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function StudentSignup() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    try {
      setError("");
      setLoading(true);

      // Check if username already exists
      const usernameQuery = query(
        collection(db, "students"),
        where("username", "==", username)
      );
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        setError("Username already taken. Please choose another one.");
        setLoading(false);
        return;
      }

      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store student data in Firestore
      await setDoc(doc(db, "students", user.uid), {
        username,
        name,
        email,
        age: parseInt(age),
        gender,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });

      alert("Account created successfully! 🎉");
      nav("/student/login");
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  function getFirebaseErrorMessage(error: any) {
    const code = error?.code || "";

    switch (code) {
      case "auth/email-already-in-use":
        return "Email already registered 📧";
      case "auth/invalid-email":
        return "Invalid email address ✉️";
      case "auth/weak-password":
        return "Password should be at least 6 characters 🔑";
      case "auth/network-request-failed":
        return "Network error. Try again 🌐";
      default:
        return "Signup failed. Please try again 😕";
    }
  }

  function Loader() {
    return (
      <div className="flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach via-orange-100 to-pink-100">
      <Navbar />

      <section className="relative max-w-xl mx-auto px-4 py-8 pb-20">
        {/* glows */}
        <div className="absolute top-0 left-12 w-28 h-28 bg-yellow-300/30 blur-2xl rounded-full animate-pulse" />
        <div className="absolute bottom-24 right-14 w-36 h-36 bg-pink-300/30 blur-2xl rounded-full animate-pulse" />

        <div className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-5xl p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold text-center mb-2">
            <span className="text-orange-600">Student</span>{" "}
            <span className="text-pink-500">Sign Up</span>
          </h2>

          <p className="text-center text-gray-700 mb-6">
            Start your sign language journey 🌈
          </p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full p-4 rounded-full border-2 border-blue-300
                focus:outline-none focus:ring-4 focus:ring-blue-200
                text-center
              "
            />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full p-4 rounded-full border-2 border-yellow-300
                focus:outline-none focus:ring-4 focus:ring-yellow-200
                text-center
              "
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full p-4 rounded-full border-2 border-orange-300
                focus:outline-none focus:ring-4 focus:ring-orange-200
                text-center
              "
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="
                  w-full p-4 rounded-full border-2 border-pink-300
                  focus:outline-none focus:ring-4 focus:ring-pink-200
                  text-center
                "
              />

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="
                  w-full p-4 rounded-full border-2 border-purple-300
                  focus:outline-none focus:ring-4 focus:ring-purple-200
                  text-center
                "
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full p-4 rounded-full border-2 border-red-300
                focus:outline-none focus:ring-4 focus:ring-red-200
                text-center
              "
            />

            <div className="flex justify-center pt-4">
              <PrimaryButton
                disabled={
                  loading ||
                  username.length < 3 ||
                  name.length < 2 ||
                  !email.includes("@") ||
                  !age ||
                  !gender ||
                  password.length < 6
                }
                onClick={handleSignup}
              >
                {loading ? <Loader /> : "Create Student Account ✨"}
              </PrimaryButton>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-xl text-center text-sm">
                {error}
              </div>
            )}

            <p className="text-center text-sm text-gray-600 mt-4">
              Already a Student?{" "}
              <span
                onClick={() => nav("/student/login")}
                className="text-pink-500 font-semibold cursor-pointer underline"
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
