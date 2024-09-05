import { FileText, FiletypeDoc, FiletypeDocx, FiletypeGif, FiletypeJpg, FiletypeMp3, FiletypeMp4, FiletypePdf, FiletypePng, FiletypePptx, FiletypeTxt, FiletypeWav, FiletypeXls, FiletypeXlsx, FileZip, FolderFill } from "react-bootstrap-icons";
import colors from "../colors";

 export const fileIcons: { [key: string]: React.ReactNode } = {
    folder: <FolderFill color={colors.yellow} />,
    pdf: <FiletypePdf color={colors.red} />,
    doc: <FiletypeDoc color={colors.tealBlue} />,
    docx: <FiletypeDocx color={colors.tealBlue} />,
    xls: <FiletypeXls color={colors.green} />,
    xlsx: <FiletypeXlsx color={colors.green} />,
    ppt: <FiletypePdf color={colors.red} />,
    pptx: <FiletypePptx color={colors.red} />,
    txt: <FiletypePptx color={colors.darkGray} />,
    csv: <FiletypeTxt color={colors.darkGray} />,
    jpeg: <FiletypeJpg color={colors.yellow} />,
    jpg: <FiletypeJpg color={colors.yellow} />,
    png: <FiletypePng color={colors.yellow} />,
    gif: <FiletypeGif color={colors.yellow} />,
    mp4: <FiletypeMp4 color={colors.yellow} />,
    mp3: <FiletypeMp3 color={colors.yellow} />,
    wav: <FiletypeWav color={colors.yellow} />,
    zip: <FileZip color={colors.brownishGray} />,
    rar: <FileZip color={colors.brownishGray} />,
    default:<FileText color={colors.darkGray} />
};

