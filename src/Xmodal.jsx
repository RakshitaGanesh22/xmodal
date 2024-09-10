import React, { useState, useEffect } from "react";

export default function Xmodal() {
    const [openModal, setOpenModal] = useState(false);
    const [phoneNum, setPhone] = useState("");
    const [date1, setDate] = useState("");
    const [email, setEmail] = useState("");
    
    function handleChange(event) {
        setPhone(event.target.value);
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailPattern.test(email);
        
        if (!isEmailValid) {
            alert("Invalid email");
            setPhone("");
            setDate("");
            setEmail("");
            setOpenModal(false);
            return;
        }
        
        if (phoneNum.length !== 10) {
            alert("Invalid phone number");
            setPhone("");
        setDate("");
        setEmail("");
            setOpenModal(false);
            return;
        }
        
        const [year, month, day] = date1.split("-");
        const current = new Date();
        const newDate = new Date(year, month - 1, day);
        
        if (newDate > current) {
            alert("Invalid date of birth");
            setPhone("");
            setDate("");
            setEmail("");
            setOpenModal(false);
            return;
        }
        
        // Successful submission logic here (e.g., sending data to server)

        // Close the modal and reset the form
        setPhone("");
        setDate("");
        setEmail("");
        setOpenModal(false);
    }

    function handleClickOutside(event) {
        if (event.target.className === "modal-overlay") {
            setOpenModal(false);
        }
    }

    useEffect(() => {
        if (openModal) {
            document.body.style.background = "rgba(0, 0, 0, 0.2)";
        } else {
            document.body.style.background = "";
        }
        
        return () => {
            document.body.style.background = "";
        };
    }, [openModal]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "75%",
                width: "75%",
                padding: "10rem",
            }}
        >
            <h1>User Details Modal</h1>
            <button
                style={{
                    height: "40px",
                    width: "100px",
                    borderRadius: "8px",
                    background: "#00f0ff",
                }}
                onClick={() => setOpenModal(true)}
            >
                Open Form
            </button>
            {openModal && (
                <div
                    className="modal-overlay"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.2)",
                        zIndex: 1,
                    }}
                    onClick={handleClickOutside}
                >
                    <div
                        className="modal-content"
                        style={{
                            position: "absolute",
                            zIndex: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            top: "7rem",
                            left: "20rem",
                            background: "#ffffff",
                            height: "70vh",
                            width: "60vw",
                            padding: "1rem",
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <h1>Fill Details</h1>
                            <label htmlFor="userName">UserName:</label><br />
                            <input type="text" id="userName" required /><br /><br />
                            <label htmlFor="email">Email Address:</label><br />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            /><br />
                            <br />
                            <label htmlFor="phoneNum">Phone Number:</label><br />
                            <input
                                type="tel"
                                id="phoneNum"
                                value={phoneNum}
                                onChange={handleChange}
                                required
                            /><br /><br />
                            <label htmlFor="date">Date of Birth:</label><br />
                            <input
                                type="date"
                                id="date"
                                value={date1}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            /><br /><br />
                            <button type="submit" className="submit-button">Submit</button><br />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
