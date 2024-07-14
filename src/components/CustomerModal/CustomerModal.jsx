import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

export default function CustomerModal({ showModal, setShowModal, selectedCustomer, getNameById, getCustomerTransactions, chartData }) {
return (
    <div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Transactions for Customer {getNameById(selectedCustomer)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedCustomer && getCustomerTransactions(selectedCustomer).length > 0 && (
                    <Line data={chartData(selectedCustomer)} />
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
)
}
