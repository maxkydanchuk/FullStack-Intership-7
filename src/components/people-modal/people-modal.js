import { React, useRef, useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {addPersonThunk, updatePeopleThunk} from "../../redux/people/peopleActions";

const PeopleModal = ({ isOpen, onClose, person = {}, token }) => {

  const [name, setName] = useState(person.name || "");
  const [birthYear, setBirthYear] = useState(person.birthYear || "");
  const [gender, setGender] = useState(person.gender || "")
  const [eyeColor, setEyeColor] = useState(person.eyeColor || "");
  const [height, setHeight] = useState(person.height || "");


  useEffect(() => {
    setName(person.name);
    setBirthYear(person.birthYear);
    setGender(person.gender);
    setEyeColor(person.eyeColor);
    setHeight(person.height)
  }, [person._id])


  const dispatch = useDispatch();

  const initialRef = useRef();
  const finalRef = useRef();

  const addNewItem = (item) => dispatch(addPersonThunk(item));
  const updateItem = (item, id) => dispatch(updatePeopleThunk(item, id, token))

  function resetForm() {
    setName('');
    setBirthYear('');
    setGender('');
    setEyeColor('');
    setHeight('');

  };

  const submitNewItem = async (e) => {
    e.preventDefault();

    if(person._id) {
      updateItem({
        fields: {
          name,
          birth_Year: birthYear,
          gender,
          eye_Color: eyeColor,
          height
        }
      }, person._id)
    } else {
      addNewItem({
        fields: {
          name,
          birth_Year: birthYear,
          gender,
          eye_Color: eyeColor,
          height
        }
      });
      resetForm();
    }
    onClose();
  };

  return (
      <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new person</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                  ref={initialRef}
                  placeholder="Name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Birth Year</FormLabel>
              <Input
                  placeholder="Birth Year"
                  value={birthYear || ""}
                  onChange={(e) => setBirthYear(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Input
                  placeholder="Gender"
                  type="number"
                  value={gender || ""}
                  onChange={(e) => setGender(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Eye Color</FormLabel>
              <Input
                  placeholder="Eye Color"
                  value={eyeColor || ""}
                  onChange={(e) => setEyeColor(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Height</FormLabel>
              <Input
                  placeholder="Height"
                  value={height || ""}
                  onChange={(e) => setHeight(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitNewItem}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
};

export default PeopleModal;
