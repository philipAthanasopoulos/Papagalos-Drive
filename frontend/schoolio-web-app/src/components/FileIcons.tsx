import { FileText, FiletypeDoc, FiletypeDocx, FiletypeGif, FiletypeJpg, FiletypeMp3, FiletypeMp4, FiletypePdf, FiletypePng, FiletypePptx, FiletypeTxt, FiletypeWav, FiletypeXls, FiletypeXlsx, FileZip, FolderFill } from "react-bootstrap-icons";
import colors from "../colors";

 export const fileIcons: { [key: string]: React.ReactNode } = {
    folder: <FolderFill color={colors.carrot_orange} />,
    pdf: <FiletypePdf color={colors.carrot_orange} />,
    doc: <FiletypeDoc color={colors.polynesian_blue} />,
    docx: <FiletypeDocx color={colors.polynesian_blue} />,
    xls: <FiletypeXls color={colors.shamrock_green} />,
    xlsx: <FiletypeXlsx color={colors.shamrock_green} />,
    ppt: <FiletypePdf color={colors.carrot_orange} />,
    pptx: <FiletypePptx color={colors.carrot_orange} />,
    txt: <FiletypePptx color={colors.sandy_brown} />,
    csv: <FiletypeTxt color={colors.sandy_brown} />,
    jpeg: <FiletypeJpg color={colors.jonquil} />,
    jpg: <FiletypeJpg color={colors.jonquil} />,
    png: <FiletypePng color={colors.jonquil} />,
    gif: <FiletypeGif color={colors.jonquil} />,
    mp4: <FiletypeMp4 color={colors.jonquil} />,
    mp3: <FiletypeMp3 color={colors.jonquil} />,
    wav: <FiletypeWav color={colors.jonquil} />,
    zip: <FileZip color={colors.sandy_brown} />,
    rar: <FileZip color={colors.sandy_brown} />,
    default:<FileText color={colors.sandy_brown} />
};

