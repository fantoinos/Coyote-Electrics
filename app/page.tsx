"use client";

import { useState } from "react";
import { format } from "date-fns";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [adminView, setAdminView] = useState(false);

  const hours = Array.from({ length: 28 }, (_, i) => {
    const hour = 10 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !name || !email) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    const newBooking = {
      name,
      email,
      comment,
      date: selectedDate,
      time: selectedTime,
    };

    const existing = JSON.parse(localStorage.getItem("coyote_bookings") || "[]");
    localStorage.setItem("coyote_bookings", JSON.stringify([...existing, newBooking]));

    alert(
      `Confirmation envoyée à ${email}.\nRendez-vous pour ${name} le ${selectedDate} à ${selectedTime}.\nCommentaire: ${comment}`
    );

    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setEmail("");
    setComment("");
  };

  const viewAdmin = () => {
    const bookings = JSON.parse(localStorage.getItem("coyote_bookings") || "[]");
    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Réservations enregistrées</h2>
        <ul className="space-y-2">
          {bookings.map((b: any, i: number) => (
            <li key={i} className="border p-2 rounded">
              <strong>{b.name}</strong> - {b.date} à {b.time}
              <br />
              Email : {b.email}
              <br />
              Commentaire : {b.comment || "Aucun"}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Réserver un rendez-vous - Coyote Electrics</h1>

      <button className="mb-4 underline text-blue-600" onClick={() => setAdminView(!adminView)}>
        {adminView ? "Retour à la réservation" : "Voir les réservations (Admin)"}
      </button>

      {adminView ? (
        viewAdmin()
      ) : (
        <>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Date (aaaa-mm-jj)</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Heure</label>
            <div className="grid grid-cols-4 gap-2">
              {hours.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 border rounded ${
                    selectedTime === time ? "bg-black text-white" : ""
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 grid gap-2">
            <input
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
            />
            <input
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
            />
            <textarea
              placeholder="Commentaire (facultatif)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <button onClick={handleBooking} className="bg-black text-white p-2 rounded w-full">
            Réserver (Paiement à discuter)
          </button>
        </>
      )}

      <p className="text-sm text-center text-gray-500 mt-4">
        Coyote Electrics • Contact : fantoine924@gmail.com
      </p>
    </div>
  );
}