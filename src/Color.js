/**
 * Regular expression for capturing RGB channels.
 *
 * @type {RegExp}
 * @private
 */
const RGB_REGEX = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/i;

/**
 * Regular expression for capturing HEX channels.
 *
 * @type {RegExp}
 * @private
 */
const HEX_REGEX = /#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/i;

/**
 * Color class responsible for converting colors between rgb and hex.
 *
 * @since 2.0.0
 */
class Color {
  /**
   * Create new Color instance.
   * You can use different formats of color: named, rgb or hex.
   * Class will try to parse your provided color, otherwise throws an error.
   *
   * @constructor
   * @param {String|Object} color String with named color, rgb, hex or object with {r, g, b} properties
   * @param {Number} color.r Red channel
   * @param {Number} color.g Green channel
   * @param {Number} color.b Blue channel
   * @returns {Color}
   *
   * @example
   * Color.create('black');
   * Color.create('rgb(0, 10, 20)');
   * Color.create('#AABBCC');
   * Color.create({r: 0, g: 10, b: 20});
   */
  constructor(color) {
    if (Color.isNamed(color)) return Color.fromHex(Color.COLORS[color.toUpperCase()]);
    if (Color.isRgb(color)) return Color.fromRgb(color);
    if (Color.isHex(color)) return Color.fromHex(color);
    if (!(
      Object.prototype.hasOwnProperty.call(color, 'r') ||
      Object.prototype.hasOwnProperty.call(color, 'g') ||
      Object.prototype.hasOwnProperty.call(color, 'b')
    )
    ) {
      throw new Error(`Color ${color} can't be parsed`);
    }

    this._r = 0;
    this._g = 0;
    this._b = 0;

    this.setR(color.r);
    this.setG(color.g);
    this.setB(color.b);
  }

  /**
   * Get rounded value of red channel.
   *
   * @returns {Number}
   */
  getR() {
    return Math.round(this._r);
  }

  /**
   * Set clamped value of red channel.
   *
   * @param {Number} value
   * @returns {Color}
   */
  setR(value) {
    this._r = Math.max(0, Math.min(value, 255));
    return this;
  }

  /**
   * Get rounded value of green channel.
   *
   * @returns {Number}
   */
  getG() {
    return Math.round(this._g);
  }

  /**
   * Set clamped value of green channel.
   *
   * @param {Number} value
   * @returns {Color}
   */
  setG(value) {
    this._g = Math.max(0, Math.min(value, 255));
    return this;
  }

  /**
   * Get rounded value of blue channel.
   *
   * @returns {Number}
   */
  getB() {
    return Math.round(this._b);
  }

  /**
   * Set clamped value of blue channel.
   *
   * @param {Number} value
   * @returns {Color}
   */
  setB(value) {
    this._b = Math.max(0, Math.min(value, 255));
    return this;
  }

  /**
   * Convert color to RGB representation.
   *
   * @returns {{r: Number, g: Number, b: Number}}
   */
  toRgb() {
    return { r: this.getR(), g: this.getG(), b: this.getB() };
  }

  /**
   * Convert color to HEX representation.
   *
   * @returns {String}
   */
  toHex() {
    const pad2 = c => c.length === 1 ? '0' + c : c;
    return '#' + [pad2(this.getR().toString(16)), pad2(this.getG().toString(16)), pad2(this.getB().toString(16))].join('');
  }

  /**
   * Check if provided color is named color.
   *
   * @static
   * @param {String} color
   * @returns {Boolean}
   */
  static isNamed(color) {
    return (typeof color === 'string' && Color.COLORS[color.toUpperCase()]);
  }

  /**
   * Check if provided color written in RGB representation.
   *
   * @static
   * @param {String} rgb RGB color
   * @returns {Boolean}
   */
  static isRgb(rgb) {
    return RGB_REGEX.test(rgb);
  }

  /**
   * Check if provided color written in HEX representation.
   *
   * @static
   * @param {String} hex HEX color
   * @returns {Boolean}
   */
  static isHex(hex) {
    return HEX_REGEX.test(hex);
  }

  /**
   * Parse RGB color and return Color instance.
   *
   * @static
   * @param {String} rgb RGB color
   * @returns {Color}
   */
  static fromRgb(rgb) {
    const [, r, g, b] = rgb.match(RGB_REGEX);
    return this.create({ r, g, b });
  }

  /**
   * Parse HEX color and return Color instance.
   *
   * @static
   * @param {String} hex HEX color
   * @returns {Color}
   */
  static fromHex(hex) {
    const [, r, g, b] = hex.match(HEX_REGEX);
    return this.create({ r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16) });
  }

  /**
   * Wrapper around `new Color()`.
   *
   * @static
   * @returns {Color}
   */
  static create(...args) {
    return new this(...args);
  }

  /**
   * Dictionary of all available named colors.
   *
   * @static
   * @returns {Object}
   */
  static get COLORS() {
    return {
      ALICE_BLUE: '#F0F8FF',
      ANTIQUE_WHITE: '#FAEBD7',
      AQUA: '#00FFFF',
      AZURE: '#F0FFFF',
      BEIGE: '#F5F5DC',
      BISQUE: '#FFE4C4',
      BLANCHED_ALMOND: '#FFEBCD',
      BURLY_WOOD: '#DEB887',
      CHARTREUSE: '#7FFF00',
      CHOCOLATE: '#D2691E',
      CORAL: '#FF7F50',
      CORN_FLOWER_BLUE: '#6495ED',
      CORN_SILK: '#FFF8DC',
      CRIMSON: '#DC143C',
      CYAN: '#00FFFF',
      DARK_BLUE: '#00008B',
      DARK_CYAN: '#008B8B',
      DARK_GOLDEN_ROD: '#B8860B',
      DARK_GRAY: '#A9A9A9',
      DARK_GREEN: '#006400',
      DARK_GREY: '#A9A9A9',
      DARK_KHAKI: '#BDB76B',
      DARK_MAGENTA: '#8B008B',
      DARK_OLIVE_GREEN: '#556B2F',
      DARK_ORANGE: '#FF8C00',
      DARK_ORCHID: '#9932CC',
      DARK_RED: '#8B0000',
      DARK_SALMON: '#E9967A',
      DARK_SEA_GREEN: '#8FBC8F',
      DARK_SLATE_BLUE: '#483D8B',
      DARK_SLATE_GRAY: '#2F4F4F',
      DARK_SLATE_GREY: '#2F4F4F',
      DARK_TURQUOISE: '#00CED1',
      DARK_VIOLET: '#9400D3',
      DEEP_PINK: '#FF1493',
      DEEP_SKY_BLUE: '#00BFFF',
      DIM_GRAY: '#696969',
      DIM_GREY: '#696969',
      DODGER_BLUE: '#1E90FF',
      FIREBRICK: '#B22222',
      FLORAL_WHITE: '#FFFAF0',
      GAINS_BORO: '#DCDCDC',
      GHOST_WHITE: '#F8F8FF',
      GREY: '#808080',
      HONEYDEW: '#F0FFF0',
      HOT_PINK: '#FF69B4',
      INDIAN_RED: '#CD5C5C',
      IVORY: '#FFFFF0',
      KHAKI: '#F0E68C',
      LAVENDER_BLUSH: '#FFF0F5',
      LAWN_GREEN: '#7CFC00',
      LEMON_CHIFFON: '#FFFACD',
      LIGHT_BLUE: '#ADD8E6',
      LIGHT_CORAL: '#F08080',
      LIGHT_CYAN: '#E0FFFF',
      LIGHT_GOLDENROD_YELLOW: '#FAFAD2',
      LIGHT_GRAY: '#D3D3D3',
      LIGHT_GREEN: '#90EE90',
      LIGHT_GREY: '#D3D3D3',
      LIGHT_PINK: '#FFB6C1',
      LIGHT_SALMON: '#FFA07A',
      LIGHT_SEA_GREEN: '#20B2AA',
      LIGHT_SKY_BLUE: '#87CEFA',
      LIGHT_SLATE_GRAY: '#778899',
      LIGHT_SLATE_GREY: '#778899',
      LIGHT_STEEL_BLUE: '#B0C4DE',
      LIGHT_YELLOW: '#FFFFE0',
      LIME: '#00FF00',
      LIME_GREEN: '#32CD32',
      LINEN: '#FAF0E6',
      MEDIUM_AQUAMARINE: '#66CDAA',
      MEDIUM_BLUE: '#0000CD',
      MEDIUM_ORCHID: '#BA55D3',
      MEDIUM_PURPLE: '#9370DB',
      MEDIUM_SEA_GREEN: '#3CB371',
      MEDIUM_SLATE_BLUE: '#7B68EE',
      MEDIUM_SPRING_GREEN: '#00FA9A',
      MEDIUM_TURQUOISE: '#48D1CC',
      MEDIUM_VIOLET_RED: '#C71585',
      MINT_CREAM: '#F5FFFA',
      MISTY_ROSE: '#FFE4E1',
      MOCCASIN: '#FFE4B5',
      NAVAJO_WHITE: '#FFDEAD',
      NAVY: '#000080',
      OLD_LACE: '#FDF5E6',
      OLIVE: '#808000',
      OLIVE_DRAB: '#6B8E23',
      PALE_GOLDENROD: '#EEE8AA',
      PALE_GREEN: '#98FB98',
      PALE_TURQUOISE: '#AFEEEE',
      PALE_VIOLET_RED: '#DB7093',
      PAPAYA_WHIP: '#FFEFD5',
      PEACH_PUFF: '#FFDAB9',
      PERU: '#CD853F',
      PINK: '#FFC0CB',
      POWDER_BLUE: '#B0E0E6',
      PURPLE: '#800080',
      REBECCA_PURPLE: '#663399',
      ROSY_BROWN: '#BC8F8F',
      ROYAL_BLUE: '#4169E1',
      SADDLE_BROWN: '#8B4513',
      SANDY_BROWN: '#F4A460',
      SEASHELL: '#FFF5EE',
      SIENNA: '#A0522D',
      SLATE_BLUE: '#6A5ACD',
      SLATE_GRAY: '#708090',
      SLATE_GREY: '#708090',
      SNOW: '#FFFAFA',
      STEEL_BLUE: '#4682B4',
      TEAL: '#008080',
      TOMATO: '#FF6347',
      TURQUOISE: '#40E0D0',
      VIOLET: '#EE82EE',
      WHEAT: '#F5DEB3',
      WHITE_SMOKE: '#F5F5F5',
      ALMOND: '#EFDECD',
      ANTIQUE_BRASS: '#CD9575',
      APRICOT: '#FDD9B5',
      AQUAMARINE: '#78DBE2',
      ASPARAGUS: '#87A96B',
      ATOMIC_TANGERINE: '#FFA474',
      BANANA_MANIA: '#FAE7B5',
      BEAVER: '#9F8170',
      BITTERSWEET: '#FD7C6E',
      BLACK: '#000000',
      BLIZZARD_BLUE: '#ACE5EE',
      BLUE: '#1F75FE',
      BLUE_BELL: '#A2A2D0',
      BLUE_GRAY: '#6699CC',
      BLUE_GREEN: '#0D98BA',
      BLUE_VIOLET: '#7366BD',
      BLUSH: '#DE5D83',
      BRICK_RED: '#CB4154',
      BROWN: '#B4674D',
      BURNT_ORANGE: '#FF7F49',
      BURNT_SIENNA: '#EA7E5D',
      CADET_BLUE: '#B0B7C6',
      CANARY: '#FFFF99',
      CARIBBEAN_GREEN: '#1CD3A2',
      CARNATION_PINK: '#FFAACC',
      CERISE: '#DD4492',
      CERULEAN: '#1DACD6',
      CHESTNUT: '#BC5D58',
      COPPER: '#DD9475',
      CORNFLOWER: '#9ACEEB',
      COTTON_CANDY: '#FFBCD9',
      DANDELION: '#FDDB6D',
      DENIM: '#2B6CC4',
      DESERT_SAND: '#EFCDB8',
      EGGPLANT: '#6E5160',
      ELECTRIC_LIME: '#CEFF1D',
      FERN: '#71BC78',
      FOREST_GREEN: '#6DAE81',
      FUCHSIA: '#C364C5',
      FUZZY_WUZZY: '#CC6666',
      GOLD: '#E7C697',
      GOLDENROD: '#FCD975',
      GRANNY_SMITH_APPLE: '#A8E4A0',
      GRAY: '#95918C',
      GREEN: '#1CAC78',
      GREEN_BLUE: '#1164B4',
      GREEN_YELLOW: '#F0E891',
      HOT_MAGENTA: '#FF1DCE',
      INCHWORM: '#B2EC5D',
      INDIGO: '#5D76CB',
      JAZZBERRY_JAM: '#CA3767',
      JUNGLE_GREEN: '#3BB08F',
      LASER_LEMON: '#FEFE22',
      LAVENDER: '#FCB4D5',
      LEMON_YELLOW: '#FFF44F',
      MACARONI_AND_CHEESE: '#FFBD88',
      MAGENTA: '#F664AF',
      MAGIC_MINT: '#AAF0D1',
      MAHOGANY: '#CD4A4C',
      MAIZE: '#EDD19C',
      MANATEE: '#979AAA',
      MANGO_TANGO: '#FF8243',
      MAROON: '#C8385A',
      MAUVELOUS: '#EF98AA',
      MELON: '#FDBCB4',
      MIDNIGHT_BLUE: '#1A4876',
      MOUNTAIN_MEADOW: '#30BA8F',
      MULBERRY: '#C54B8C',
      NAVY_BLUE: '#1974D2',
      NEON_CARROT: '#FFA343',
      OLIVE_GREEN: '#BAB86C',
      ORANGE: '#FF7538',
      ORANGE_RED: '#FF2B2B',
      ORANGE_YELLOW: '#F8D568',
      ORCHID: '#E6A8D7',
      OUTER_SPACE: '#414A4C',
      OUTRAGEOUS_ORANGE: '#FF6E4A',
      PACIFIC_BLUE: '#1CA9C9',
      PEACH: '#FFCFAB',
      PERIWINKLE: '#C5D0E6',
      PIGGY_PINK: '#FDDDE6',
      PINE_GREEN: '#158078',
      PINK_FLAMINGO: '#FC74FD',
      PINK_SHERBET: '#F78FA7',
      PLUM: '#8E4585',
      PURPLE_HEART: '#7442C8',
      PURPLE_MOUNTAINS_MAJESTY: '#9D81BA',
      PURPLE_PIZZAZZ: '#FE4EDA',
      RADICAL_RED: '#FF496C',
      RAW_SIENNA: '#D68A59',
      RAW_UMBER: '#714B23',
      RAZZLE_DAZZLE_ROSE: '#FF48D0',
      RAZZMATAZZ: '#E3256B',
      RED: '#EE204D',
      RED_ORANGE: '#FF5349',
      RED_VIOLET: '#C0448F',
      ROBINS_EGG_BLUE: '#1FCECB',
      ROYAL_PURPLE: '#7851A9',
      SALMON: '#FF9BAA',
      SCARLET: '#FC2847',
      SCREAMING_GREEN: '#76FF7A',
      SEA_GREEN: '#9FE2BF',
      SEPIA: '#A5694F',
      SHADOW: '#8A795D',
      SHAMROCK: '#45CEA2',
      SHOCKING_PINK: '#FB7EFD',
      SILVER: '#CDC5C2',
      SKY_BLUE: '#80DAEB',
      SPRING_GREEN: '#ECEABE',
      SUNGLOW: '#FFCF48',
      SUNSET_ORANGE: '#FD5E53',
      TAN: '#FAA76C',
      TEAL_BLUE: '#18A7B5',
      THISTLE: '#EBC7DF',
      TICKLE_ME_PINK: '#FC89AC',
      TIMBERWOLF: '#DBD7D2',
      TROPICAL_RAIN_FOREST: '#17806D',
      TUMBLEWEED: '#DEAA88',
      TURQUOISE_BLUE: '#77DDE7',
      UNMELLOW_YELLOW: '#FFFF66',
      VIOLET_PURPLE: '#926EAE',
      VIOLET_BLUE: '#324AB2',
      VIOLET_RED: '#F75394',
      VIVID_TANGERINE: '#FFA089',
      VIVID_VIOLET: '#8F509D',
      WHITE: '#FFFFFF',
      WILD_BLUE_YONDER: '#A2ADD0',
      WILD_STRAWBERRY: '#FF43A4',
      WILD_WATERMELON: '#FC6C85',
      WISTERIA: '#CDA4DE',
      YELLOW: '#FCE883',
      YELLOW_GREEN: '#C5E384',
      YELLOW_ORANGE: '#FFAE42'
    };
  }
}

module.exports = Color;
