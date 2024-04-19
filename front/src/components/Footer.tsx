"use client"
import { useState } from "react";
import QRCode from "qrcode.react";
import { Button, Modal } from "flowbite-react";

export default function Footer() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);
  return (
    <footer
      className="fixed bottom-10 flex justify-center md:mb-0 mb-2 p-6 border-2 border-purple-800 rounded-full bg-white"
      onClick={toggleModal}
    >
      <QRCode value="http://github.com" size={50} />      
      <Modal show={modalIsOpen} onClose={toggleModal}>
        <div className="flex flex-col items-center justify-center h-full p-10">
          <h2 className="text-indigo-900 md:text-xl text-base font-semibold mb-6">
            Present your QR code for scanning
          </h2>
          <div className="border border-black p-6 rounded-xl">
            <QRCode value="http://github.com" size={250} fgColor="#331b5c" />
          </div>
          <Button
            className="mt-8 bg-indigo-900 text-white"
            onClick={toggleModal}
          >
            Fermer
          </Button>
        </div>
       
      </Modal>
    </footer>
  );
}