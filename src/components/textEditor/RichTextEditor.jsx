import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import 'react-quill/dist/quill.core.css';

export default function RichTextEditor({
    placeholder = "Start typing",
    onChange,
    value,
    label,
    required = false,
    no_label = false,
    readOnly = false,
    height = '200px'

}) {
    // const [value, setValue] = useState('');

    let toolbarOptions = {
        toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            // ['blockquote', 'code-block'],

            // [{ 'header': 1 }, { 'header': 2 }],                // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            // [{ 'direction': 'rtl' }],                         // text direction

            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            // [{ 'font': [] }],
            [{ align: [] }],
            // ['clean']                                         // remove formatting button
        ]
    };

    let toolbarOptions2 = {
        toolbar: []                                       // remove formatting button]
    };

    return (
        <div>
            <div>
                {!no_label && (
                    <div
                        className={`text-cHighlighted text-fs14 font-fw600 mb-s15 capitalize w-full ${required === true ? "req-field" : ""
                            }`}
                    >
                        {label}
                    </div>
                )}
            </div>

            <div className="">
                <ReactQuill
                    className="w-full rounded-br5 "
                    theme={readOnly ? "bubble" : "snow"}
                    style={{ height: height, backgroundColor: "bg-gray-200" }}
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                        // console.log(e);
                    }}
                    modules={readOnly ? toolbarOptions2 : toolbarOptions}
                    placeholder={placeholder}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
}
