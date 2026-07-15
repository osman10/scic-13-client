"use client";

import { Button } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Input, Textarea } from "@heroui/react";
import { FaEdit } from "react-icons/fa";
import { useState, useTransition } from "react";

interface Experience {
  _id: { toString: () => string };
  title: string;
  subTitle: string;
  country: string;
  catagory: string;
  rating: number;
  experience: string;
  price: number;
  image: string;
}

interface EditButtonProps {
  experience: Experience;
  action: (id: string, data: any) => Promise<void>;
}

export const EditButton = ({ experience, action }: EditButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: experience.title,
    subTitle: experience.subTitle,
    country: experience.country,
    catagory: experience.catagory,
    rating: experience.rating,
    experience: experience.experience,
    price: experience.price,
    image: experience.image,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    startTransition(async () => {
      try {
        await action(experience._id.toString(), formData);
        setIsOpen(false);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <>
      <Button
        color="primary"
        variant="flat"
        onPress={() => setIsOpen(true)}
        startContent={<FaEdit size={18} />}
        className="font-medium"
      >
        Edit
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">Edit Experience</h2>
                <p className="text-sm text-gray-500">
                  Update your experience details
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter experience title"
                    variant="bordered"
                  />
                  <Input
                    label="Subtitle"
                    name="subTitle"
                    value={formData.subTitle}
                    onChange={handleChange}
                    placeholder="Enter subtitle"
                    variant="bordered"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter country"
                      variant="bordered"
                    />
                    <Input
                      label="Category"
                      name="catagory"
                      value={formData.catagory}
                      onChange={handleChange}
                      placeholder="Enter category"
                      variant="bordered"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Rating"
                      name="rating"
                      type="number"
                      value={formData.rating.toString()}
                      onChange={handleChange}
                      placeholder="Enter rating"
                      variant="bordered"
                      min={0}
                      max={5}
                      step={0.1}
                    />
                    <Input
                      label="Price"
                      name="price"
                      type="number"
                      value={formData.price.toString()}
                      onChange={handleChange}
                      placeholder="Enter price"
                      variant="bordered"
                      startContent="$"
                      min={0}
                      step={0.01}
                    />
                  </div>
                  <Textarea
                    label="Description"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Describe your experience"
                    variant="bordered"
                    minRows={3}
                  />
                  <Input
                    label="Image URL"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    variant="bordered"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isLoading={isPending}
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};