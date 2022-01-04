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
import { addStarshipThunk, updateStarshipThunk } from "../../redux/starships/starshipsActions";
import { useDispatch } from "react-redux";

const StarshipsModal = ({ isOpen, onClose, starship = {}, token }) => {

  const [pilots, setPilots] = useState(starship.pilots || "");
  const [MGLT, setMGLT] = useState(starship.MGLT || "");
  const [starshipClass, setStarshipClass] = useState(
    starship.starshipClass || ""
  );
  const [hyperdriveRating, setHyperdriveRating] = useState(
    starship.hyperdriveRating || ""
  );

  useEffect(() => {
    setPilots(starship.pilots);
    setMGLT(starship.MGLT);
    setStarshipClass(starship.starshipClass);
    setHyperdriveRating(starship.hyperdriveRating);
  }, [starship._id])


  const dispatch = useDispatch();

  const initialRef = useRef();
  const finalRef = useRef();

  const addNewItem = (item) => dispatch(addStarshipThunk(item));
  const updateItem = (item, id) => dispatch(updateStarshipThunk(item, id, token))

  function resetForm() {
    setPilots('');
    setMGLT('');
    setStarshipClass('');
    setHyperdriveRating('');
  };

  const submitNewItem = async (e) => {
    e.preventDefault();

    if(starship._id) {
      updateItem({
        fields: {
          pilots,
          MGLT,
          starship_class: starshipClass,
          hyperdrive_rating: hyperdriveRating,
        }
      }, starship._id)
    } else {
      addNewItem({
        fields: {
          pilots,
          MGLT,
          starship_class: starshipClass,
          hyperdrive_rating: hyperdriveRating,
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
          <ModalHeader>Create new starship</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Starship class</FormLabel>
              <Input
                  ref={initialRef}
                  placeholder="Starship class"
                  value={starshipClass || ""}
                  onChange={(e) => setStarshipClass(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>MGLT</FormLabel>
              <Input
                  placeholder="MGLT"
                  value={MGLT || ""}
                  onChange={(e) => setMGLT(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Hyperdrive rating</FormLabel>
              <Input
                  placeholder="Hyperdrive rating"
                  type="number"
                  value={hyperdriveRating || ""}
                  onChange={(e) => setHyperdriveRating(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Pilots</FormLabel>
              <Input
                  placeholder="Pilots"
                  value={pilots || ""}
                  onChange={(e) => setPilots(e.target.value)}
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

export default StarshipsModal;
