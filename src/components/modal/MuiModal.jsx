import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function MuiModal({ open, setOpen, title = 'Title', subtitle = 'Subtitle', body, width = 'w-full', has_close = true }) {
    return (
        <>
            <Modal disableEscapeKeyDown={!has_close} open={open} onClose={() => has_close && setOpen(false)}>
                <Box className={`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute inline-block ${width} max-w-3xl px-5 py-5 my-5 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg`}>

                    {has_close && <AiFillCloseCircle
                        onClick={() => setOpen(false)}
                        className="absolute top-2 right-2 text-2xl cursor-pointer text-gray-600"
                    />}

                    <div className="p-0 text-center font-bold text-xl text-gray-700">
                        {title}
                    </div>

                    <div className="pt-2 pb-8 text-center">
                        {subtitle}
                    </div>

                    {body}

                </Box>
            </Modal>
        </>
    );
}
