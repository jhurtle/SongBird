package com.songbird.music;

import com.songbird.music.artist.Artist;
import com.songbird.music.artist.ArtistController;
import com.songbird.music.artist.ArtistRepository;
import com.songbird.music.artist.ArtistService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameters;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;


import javax.print.attribute.standard.Media;

import static org.junit.jupiter.api.Assertions.*;
//@WebAppConfiguration
//@ContextConfiguration(classes = {ArtistController.class, ArtistService.class, ArtistRepository.class, Artist.class})
//@ContextConfiguration
/*
@RunWith(SpringRunner.class)
@SpringBootTest
*/
//@WebMvcTest(value = ArtistController.class, secure = false)
public class MusicTest {

/*
    @Autowired
    private MockMvc mockMvc;
*/

/*
    @MockBean
    private ArtistService artistService;
*/
/*
    @Autowired
    private ArtistController artistController;

    @Autowired
    private ArtistService artistService;

    @Autowired
    //@MockBean
    private ArtistRepository artistRepository;

    */
    /*
    @Autowired
    private ArtistController artistController;
*/
    public MusicTest(){

    }

    /*
    This tests the addArtist function
        Create a new artist object,
     */
    /*
    Good test
    @Test
    @Transactional
    public void addArtist(){
        Artist a = new Artist();
        a.setName("Test Artist 1");
        a.setDescription("Test Description");
        a.setArtSrc("Art Location");
        Artist b = artistController.addArtist(a);
        //Artist b = artistService.addArtist(a);
        Artist c = artistRepository.findOne(b.getId());
        assertEquals(b,c);
    }
    */

    /*
    Good test
    @Test
    @Transactional
    public void removeArtist(){
        Artist a = new Artist();
        a.setName("Test Artist 1");
        a.setDescription("Test Description");
        a.setArtSrc("Art Location");
        Artist b = artistController.addArtist(a);
        a.setId(b.getId());
        //Artist b = artistService.addArtist(a);
        artistController.removeArtist("12345", b.getId());
        Artist c = artistRepository.findOne(b.getId());
        assertEquals(a,b);
        assertEquals(null, c);
    }
    */

    /*
    @Test
    public void addArtist() throws Exception{
        Artist a = new Artist();
        a.setEmail("Test Artist 1");
        a.setDescription("Test Description");
        a.setArtSrc("Art Location");
        //Mockito.when(artistService.addArtist(Mockito.anyObject()))

        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/artist/add/")
                .accept(MediaType.APPLICATION_JSON_UTF8_VALUE)
                .contentType(MediaType.APPLICATION_JSON_UTF8_VALUE).content(
                        new String("{\"name\": \"3 Doors Down\",\"description\": \"3 Doors Down is an American rock band...\",\"artSrc\": \"C:\\dummy\\songbird\\artist\\art.png\"}").getBytes());

        RequestBuilder requestBuilderTest = MockMvcRequestBuilders.post("/artist/test/");
        //MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MvcResult result = mockMvc.perform(requestBuilderTest).andReturn();
        assertEquals("This is a test.", "This is a test.");
    }
    */
}