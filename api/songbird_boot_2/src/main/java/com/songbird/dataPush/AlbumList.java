package com.songbird.dataPush;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "imageLarge",
    "imageSmall",
    "setName",
    "artist",
    "tracks"
})
public class AlbumList {

    @JsonProperty("imageLarge")
    private String imageLarge;
    @JsonProperty("imageSmall")
    private String imageSmall;
    @JsonProperty("setName")
    private String setName;
    @JsonProperty("artist")
    private List<String> artist = null;
    @JsonProperty("tracks")
    private List<Track> tracks = null;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public AlbumList() {
    }

    /**
     * 
     * @param imageLarge
     * @param tracks
     * @param artist
     * @param setName
     * @param imageSmall
     */
    public AlbumList(String imageLarge, String imageSmall, String setName, List<String> artist, List<Track> tracks) {
        super();
        this.imageLarge = imageLarge;
        this.imageSmall = imageSmall;
        this.setName = setName;
        this.artist = artist;
        this.tracks = tracks;
    }

    @JsonProperty("imageLarge")
    public String getImageLarge() {
        return imageLarge;
    }

    @JsonProperty("imageLarge")
    public void setImageLarge(String imageLarge) {
        this.imageLarge = imageLarge;
    }

    @JsonProperty("imageSmall")
    public String getImageSmall() {
        return imageSmall;
    }

    @JsonProperty("imageSmall")
    public void setImageSmall(String imageSmall) {
        this.imageSmall = imageSmall;
    }

    @JsonProperty("setName")
    public String getSetName() {
        return setName;
    }

    @JsonProperty("setName")
    public void setSetName(String setName) {
        this.setName = setName;
    }

    @JsonProperty("artist")
    public List<String> getArtist() {
        return artist;
    }

    @JsonProperty("artist")
    public void setArtist(List<String> artist) {
        this.artist = artist;
    }

    @JsonProperty("tracks")
    public List<Track> getTracks() {
        return tracks;
    }

    @JsonProperty("tracks")
    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
