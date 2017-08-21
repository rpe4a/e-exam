import React, {Component} from 'react'
import TinyMCE from 'react-tinymce';

const textcolorMap = [
    '000000', 'Black',
    '000080', 'Navy',
    '00008B', 'DarkBlue ',
    '0000CD', 'MediumBlue ',
    '0000FF', 'Blue',
    '006400', 'DarkGreen ',
    '008000', 'Green ',
    '008080', 'Teal ',
    '008B8B', 'DarkCyan ',
    '00BFFF', 'DeepSkyBlue ',
    '00CED1', 'DarkTurquoise ',
    '00FA9A', 'MediumSpringGreen ',
    '00FF00', 'Lime ',
    '00FF7F', 'SpringGreen ',
    '00FFFF', 'Aqua ',
    '00FFFF', 'Cyan ',
    '191970', 'MidnightBlue ',
    '1E90FF', 'DodgerBlue ',
    '20B2AA', 'LightSeaGreen ',
    '228B22', 'ForestGreen ',
    '2E8B57', 'SeaGreen ',
    '2F4F4F', 'DarkSlateGray ',
    '32CD32', 'LimeGreen ',
    '3CB371', 'MediumSeaGreen ',
    '40E0D0', 'Turquoise ',
    '4169E1', 'RoyalBlue ',
    '4682B4', 'SteelBlue ',
    '483D8B', 'DarkSlateBlue ',
    '48D1CC', 'MediumTurquoise ',
    '4B0082', 'Indigo  ',
    '556B2F', 'DarkOliveGreen ',
    '5F9EA0', 'CadetBlue ',
    '6495ED', 'CornflowerBlue ',
    '663399', 'RebeccaPurple ',
    '66CDAA', 'MediumAquaMarine ',
    '696969', 'DimGray ',
    '6A5ACD', 'SlateBlue ',
    '6B8E23', 'OliveDrab ',
    '708090', 'SlateGray ',
    '778899', 'LightSlateGray ',
    '7B68EE', 'MediumSlateBlue ',
    '7CFC00', 'LawnGreen ',
    '7FFF00', 'Chartreuse ',
    '7FFFD4', 'Aquamarine ',
    '800000', 'Maroon ',
    '800080', 'Purple ',
    '808000', 'Olive ',
    '808080', 'Gray ',
    '87CEEB', 'SkyBlue ',
    '87CEFA', 'LightSkyBlue ',
    '8A2BE2', 'BlueViolet ',
    '8B0000', 'DarkRed ',
    '8B008B', 'DarkMagenta ',
    '8B4513', 'SaddleBrown ',
    '8FBC8F', 'DarkSeaGreen ',
    '90EE90', 'LightGreen ',
    '9370DB', 'MediumPurple ',
    '9400D3', 'DarkViolet ',
    '98FB98', 'PaleGreen ',
    '9932CC', 'DarkOrchid ',
    '9ACD32', 'YellowGreen ',
    'A0522D', 'Sienna ',
    'A52A2A', 'Brown ',
    'A9A9A9', 'DarkGray ',
    'ADD8E6', 'LightBlue ',
    'ADFF2F', 'GreenYellow ',
    'AFEEEE', 'PaleTurquoise ',
    'B0C4DE', 'LightSteelBlue ',
    'B0E0E6', 'PowderBlue ',
    'B22222', 'FireBrick ',
    'B8860B', 'DarkGoldenRod ',
    'BA55D3', 'MediumOrchid ',
    'BC8F8F', 'RosyBrown ',
    'BDB76B', 'DarkKhaki ',
    'C0C0C0', 'Silver ',
    'C71585', 'MediumVioletRed ',
    'CD5C5C', 'IndianRed  ',
    'CD853F', 'Peru ',
    'D2691E', 'Chocolate ',
    'D2B48C', 'Tan ',
    'D3D3D3', 'LightGray ',
    'D8BFD8', 'Thistle ',
    'DA70D6', 'Orchid ',
    'DAA520', 'GoldenRod ',
    'DB7093', 'PaleVioletRed ',
    'DC143C', 'Crimson ',
    'DCDCDC', 'Gainsboro ',
    'DDA0DD', 'Plum ',
    'DEB887', 'BurlyWood ',
    'E0FFFF', 'LightCyan ',
    'E6E6FA', 'Lavender ',
    'E9967A', 'DarkSalmon ',
    'EE82EE', 'Violet ',
    'EEE8AA', 'PaleGoldenRod ',
    'F08080', 'LightCoral ',
    'F0E68C', 'Khaki ',
    'F0F8FF', 'AliceBlue ',
    'F0FFF0', 'HoneyDew ',
    'F0FFFF', 'Azure ',
    'F4A460', 'SandyBrown ',
    'F5DEB3', 'Wheat ',
    'F5F5DC', 'Beige ',
    'F5F5F5', 'WhiteSmoke ',
    'F5FFFA', 'MintCream ',
    'F8F8FF', 'GhostWhite ',
    'FA8072', 'Salmon ',
    'FAEBD7', 'AntiqueWhite ',
    'FAF0E6', 'Linen ',
    'FAFAD2', 'LightGoldenRodYellow ',
    'FDF5E6', 'OldLace ',
    'FF0000', 'Red ',
    'FF00FF', 'Fuchsia ',
    'FF1493', 'DeepPink ',
    'FF4500', 'OrangeRed ',
    'FF6347', 'Tomato ',
    'FF69B4', 'HotPink ',
    'FF7F50', 'Coral ',
    'FF8C00', 'DarkOrange ',
    'FFA07A', 'LightSalmon ',
    'FFA500', 'Orange ',
    'FFB6C1', 'LightPink ',
    'FFC0CB', 'Pink ',
    'FFD700', 'Gold ',
    'FFDAB9', 'PeachPuff ',
    'FFDEAD', 'NavajoWhite ',
    'FFE4B5', 'Moccasin ',
    'FFE4C4', 'Bisque ',
    'FFE4E1', 'MistyRose ',
    'FFEBCD', 'BlanchedAlmond ',
    'FFEFD5', 'PapayaWhip ',
    'FFF0F5', 'LavenderBlush ',
    'FFF5EE', 'SeaShell ',
    'FFF8DC', 'Cornsilk ',
    'FFFACD', 'LemonChiffon ',
    'FFFAF0', 'FloralWhite ',
    'FFFAFA', 'Snow ',
    'FFFF00', 'Yellow ',
    'FFFFE0', 'LightYellow ',
    'FFFFF0', 'Ivory',
    'FFFFFF', 'White '
];

const bigConfigEditor = {
    plugins: 'code preview advlist anchor charmap fullscreen hr image insertdatetime ' +
    'link media lists print searchreplace table textcolor visualblocks visualchars wordcount',
    toolbar1: 'bold italic underline strikethrough subscript ' +
    '| alignleft aligncenter alignright alignjustify ' +
    '| outdent indent ' +
    '| bullist numlist ' +
    '| table ' +
    '| styleselect formatselect ' +
    '| fontselect fontsizeselect ' +
    '| forecolor backcolor ',
    toolbar2: 'anchor charmap ' +
    '| hr imagetools insertdatetime ' +
    '| link image media ',
    toolbar3: 'undo redo ' +
    '| removeformat ' +
    '| fullscreen preview code ' +
    '| visualblocks visualchars',
    browser_spellcheck: true,
    custom_undo_redo_levels: 10,
    image_advtab: true,
    entity_encoding: 'raw',
    fix_list_elements: true,
    fontsize_formats: '4pt 6pt 8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt 40pt 44pt 50pt',
    allow_conditional_comments: false,
    insertdatetime_formats: ['%d.%m.%Y', '%H:%M'],
    invalid_elements: 'script',
    convert_urls: true,
    textcolor_map: textcolorMap,
    textcolor_cols: 15,
    textcolor_rows: 10,
    plugin_preview_width: '785',
    height: 450,
    file_browser_callback_types: 'image',
  /*file_browser_callback: imageBrowserUpload,*/
}

const smallConfigEditor = {
    plugins: 'code preview advlist anchor ' +
    'link lists textcolor visualblocks visualchars wordcount',
    menubar: '',
    textcolor_map: textcolorMap,
    textcolor_cols: 15,
    textcolor_rows: 10,
    height: 200,
    toolbar1: 'newdocument preview | undo redo ' +
    '| bold italic underline strikethrough ' +
    '| alignleft aligncenter alignright alignjustify ' +
    '| bullist numlist ' +
    '| link ' +
    '| fontselect fontsizeselect ' +
    '| forecolor ',
    browser_spellcheck: true,
    custom_undo_redo_levels: 10,
    image_advtab: true,
    entity_encoding: 'raw',
    fix_list_elements: true,
    fontsize_formats: '4pt 6pt 8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt 40pt 44pt 50pt',
    allow_conditional_comments: false,
    invalid_elements: 'script',
    convert_urls: true,
}

/*var $inputFile = $("<input type='file' accept='image/x-png, image/jpeg'/>"), //shadow input
    $inputImageUri;

//Вызывается редактором всегда когда пользователь пытается загрузить изображение с компьютера
function imageBrowserUpload(field_name, url, type, win) {
    if (type == "image") {
        $inputImageUri = $("#" + field_name);
        $inputFile.click();
    };
};

//Сохраняем картинку на сервер и возвращаем ссылку на нее
$inputFile.on("change", function () {
    var fileInput = this,
        file = fileInput.files[0],
        result = Validation.ImageFile(file);
    if (result.valid) {

        var url = Router.action("File", "Upload"),

            //функция удачного колбека
            successloadFile = function (responce) {
                $inputImageUri.val(responce.urlImage); //ссылка на картинку на сервере
                $inputFile.val("");
            };

        HelpFuntion.UploadFile(file, url, successloadFile);

    } else {
        $inputImageUri.val(result.error);
    }
});*/

class TextEditor extends Component {
    render() {

        const { content, onChange, type, error} = this.props;
        let config = null;

        switch (type) {
            case 'big':
                config = bigConfigEditor;
                break;
            case 'small':
                config = smallConfigEditor;
                break;
            default:
                config = bigConfigEditor;
                break;
        }

        return (
            <div>
                <div className={(error) ? 'error-border-texteditor' : ''}>
                    <TinyMCE
                            content={content}
                            config={config}
                            onChange={onChange}
                            />
                </div>
                {(error) ? <span className='text-danger'>{error}</span> : ''}
            </div>
        )
    }
}

TextEditor.propTypes = {
    type: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    content: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,

}

export default TextEditor

