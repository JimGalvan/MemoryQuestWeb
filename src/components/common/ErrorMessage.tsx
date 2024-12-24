import {Alert, Center} from "@mantine/core";

export const ErrorMessage = (props: { message: string }) => {
    return (
        <Center style={{height: '100vh'}}>
            <Alert title="Error" color="red">
                {props.message}
            </Alert>
        </Center>
    );
}