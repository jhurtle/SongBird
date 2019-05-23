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
    "imageMed",
    "imageSmall",
    "name",
    "followers",
    "genres",
    "albumList",
    "bio"
})
public class DataModel {

    @JsonProperty("imageLarge")
    private String imageLarge;
    @JsonProperty("imageMed")
    private String imageMed;
    @JsonProperty("imageSmall")
    private String imageSmall;
    @JsonProperty("name")
    private String name;
    @JsonProperty("followers")
    private int followers;
    @JsonProperty("genres")
    private List<String> genres = null;
    @JsonProperty("albumList")
    private List<AlbumList> albumList = null;
    @JsonProperty("bio")
    private String bio;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public DataModel() {
    }

    /**
     * 
     * @param imageLarge
     * @param followers
     * @param bio
     * @param genres
     * @param imageMed
     * @param name
     * @param imageSmall
     * @param albumList
     */
    public DataModel(String imageLarge, String imageMed, String imageSmall, String name, int followers, List<String> genres, List<AlbumList> albumList, String bio) {
        super();
        this.imageLarge = imageLarge;
        this.imageMed = imageMed;
        this.imageSmall = imageSmall;
        this.name = name;
        this.followers = followers;
        this.genres = genres;
        this.albumList = albumList;
        this.bio = bio;
    }

    @JsonProperty("imageLarge")
    public String getImageLarge() {
        return imageLarge;
    }

    @JsonProperty("imageLarge")
    public void setImageLarge(String imageLarge) {
        this.imageLarge = imageLarge;
    }

    @JsonProperty("imageMed")
    public String getImageMed() {
        return imageMed;
    }

    @JsonProperty("imageMed")
    public void setImageMed(String imageMed) {
        this.imageMed = imageMed;
    }

    @JsonProperty("imageSmall")
    public String getImageSmall() {
        return imageSmall;
    }

    @JsonProperty("imageSmall")
    public void setImageSmall(String imageSmall) {
        this.imageSmall = imageSmall;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("followers")
    public int getFollowers() {
        return followers;
    }

    @JsonProperty("followers")
    public void setFollowers(int followers) {
        this.followers = followers;
    }

    @JsonProperty("genres")
    public List<String> getGenres() {
        return genres;
    }

    @JsonProperty("genres")
    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    @JsonProperty("albumList")
    public List<AlbumList> getAlbumList() {
        return albumList;
    }

    @JsonProperty("albumList")
    public void setAlbumList(List<AlbumList> albumList) {
        this.albumList = albumList;
    }

    @JsonProperty("bio")
    public String getBio() {
        return bio;
    }

    @JsonProperty("bio")
    public void setBio(String bio) {
        this.bio = bio;
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
