import React, { useState } from "react";
import { Stack, Steps } from "@chakra-ui/react";

const steps = [
    { title: "Basic" },
    { title: "Stage" },
    { title: "Revenue" },
    { title: "Funding Sources" },
    { title: "More" },
    { title: "Logo" },
    { title: "Background" },
];

const StepHeader = ({ currentStep }) => {
    return (
        <div className="px-8 py-7">
            <Stack gap="16">
                <Steps.Root count={steps.length} step={currentStep}>
                    <Steps.List>
                        {steps.map((step, index) => (
                            <Steps.Item
                                key={index}
                                index={index}
                                title={step.title}
                                status={
                                    index < currentStep
                                        ? "complete"
                                        : index === currentStep
                                            ? "active"
                                            : "pending"
                                }
                            >
                                <Steps.Indicator style={{

                                    backgroundColor: index < currentStep ? "#2F65B9" : "",

                                }} />
                                <Steps.Title style={{
                                    color: index < currentStep ? "#2F65B9" : "black",
                                }}>{step.title}</Steps.Title>
                                <Steps.Separator style={{
                                    backgroundColor: index < currentStep ? "#2F65B9" : "gray",
                                }} />
                            </Steps.Item>
                        ))}
                    </Steps.List>
                </Steps.Root>
            </Stack>
        </div>
    );
};

export default StepHeader;