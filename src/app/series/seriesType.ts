export enum OriginCountrySeriesType {
	CA = "CA",
	CN = "CN",
	Kr = "KR",
	Us = "US",
}

export enum OriginalLanguageSeriesType {
	En = "en",
	Ko = "ko",
	Zh = "zh",
}

export interface Serie {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    origin_country:    OriginCountrySeriesType[];
    original_language: OriginalLanguageSeriesType;
    original_name:     string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    first_air_date:    Date;
    name:              string;
    vote_average:      number;
    vote_count:        number;
}