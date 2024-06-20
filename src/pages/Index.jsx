import React, { useState } from 'react';
import { Container, VStack, Text, Button, Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel, Input, Select, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ date: '', amount: '', type: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (isEditing) {
      const updatedTransactions = transactions.map((transaction, index) => 
        index === currentIndex ? form : transaction
      );
      setTransactions(updatedTransactions);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setTransactions([...transactions, form]);
    }
    setForm({ date: '', amount: '', type: '', category: '' });
  };

  const handleEdit = (index) => {
    setForm(transactions[index]);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Sneaker Accounting App</Text>
        <FormControl id="date">
          <FormLabel>Date</FormLabel>
          <Input type="date" name="date" value={form.date} onChange={handleChange} />
        </FormControl>
        <FormControl id="amount">
          <FormLabel>Amount</FormLabel>
          <Input type="number" name="amount" value={form.amount} onChange={handleChange} />
        </FormControl>
        <FormControl id="type">
          <FormLabel>Type</FormLabel>
          <Select name="type" value={form.type} onChange={handleChange}>
            <option value="">Select type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
        </FormControl>
        <FormControl id="category">
          <FormLabel>Category</FormLabel>
          <Select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </Select>
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          {isEditing ? 'Update Transaction' : 'Add Transaction'}
        </Button>
        <Table variant="simple" mt={10}>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Category</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={index}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.category}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm" onClick={() => handleEdit(index)}><FaEdit /></Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(index)}><FaTrash /></Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;