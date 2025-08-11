import React, { useState, useRef, useEffect } from "react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setHasUnread(false);
  };

  const notifications = [
    "Alex replied to your comment",
    "Maria mentioned you in a post",
    "John liked your debate",
    "New debate in Politics",
    "Anna followed you",
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="notification-wrapper" ref={dropdownRef}>
      <button className="bell-button" onClick={toggleDropdown}>
        🛎️
        {hasUnread && <span className="unread-dot"></span>}
      </button>

      {isOpen && (
        <div className="dropdown">
          <ul>
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
