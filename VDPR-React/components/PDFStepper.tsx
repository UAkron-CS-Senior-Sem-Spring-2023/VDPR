import {
  Stepper,
  StepperSteps,
  StepperStep,
  StepperCompleted,
} from '@saas-ui/stepper'
import { useState } from 'react'
import { Box, Button, ButtonGroup, Heading, Icon, Spacer, } from '@chakra-ui/react'
import Image from 'next/image'

function PDFStepper() {
  const [step, setStep] = useState(0)

  const back = () => {
    setStep(step - 1)
  }

  const next = () => {
    setStep(step + 1)
  }

  const steps = [
    {
      name: 'step 1',
      title: 'Go to student center',
      children: <Box py="4">
        <Image src="/step1.png" alt="step1" width="600" height="800" />
      </Box>,
      icon: <Box></Box>
    },
    {
      name: 'step 2',
      title: 'Click My Academics',
      children: <Box py="4">
        <Image src="/step2.png" alt="step2" width="600" height="800" />
      </Box>,
      icon: <Box></Box>,
    },
    {
      name: 'step 3',
      title: 'Click Degree Progress Report',
      children: <Box py="4">
        <Image src="/step3.png" alt="step3" width="600" height="800" />
      </Box>,
      icon: <Box></Box>,
    },
    {
      name: 'step 4',
      title: 'View report as PDF',
      children: <Box py="4">
        <Image src="/step4.png" alt="step4" width="600" height="800" />
      </Box>,
      icon: <Box></Box>,
    },
    {
      name: 'step 5',
      title: 'Download your PDF',
      children: <Box py="4" textAlign="center">
        <Heading size="md">Learn how to download a pdf here: </Heading>
        <br />
        <Button 
          colorScheme="teal" 
          variant="outline" 
          size="sm" 
          onClick={() => window.open("https://www.howtogeek.com/721441/how-to-download-pdfs-instead-of-previewing-them-in-chrome-firefox-and-edge/", "_blank")}
          >
            Learn How in a new tab
        </Button>
        <br />
      </Box>,
      icon: <Box></Box>,
    },
  ]

  return (
    <Box>
      <Stepper step={step} mb="2">
        {steps.map((args, i) => (
          <StepperStep key={i} {...args} />
        ))}
        <StepperCompleted py="4">
          <Box textAlign={"center"}>
            <br />
            <Heading size="md">Congratulations, you did it! 🎉</Heading>
            <br />
          </Box>
        </StepperCompleted>
      </Stepper>
      <ButtonGroup width="100%">
        <Button onClick={back} isDisabled={step === 0}>back</Button>
        <Spacer />
        <Button onClick={next} isDisabled={step >= 5}>next</Button>
      </ButtonGroup>
    </Box>
  )
}

export default PDFStepper;