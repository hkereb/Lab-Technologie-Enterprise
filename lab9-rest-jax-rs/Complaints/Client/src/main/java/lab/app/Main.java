package lab.app;

import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.GenericType;
import jakarta.ws.rs.core.MediaType;
import lab.dto.ComplaintDTO;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        Client client = ClientBuilder.newClient();
        String baseUri = "http://localhost:8080/Server-1.0-SNAPSHOT/api/complaints";

        System.out.println("--- All complaints ---");
        List<ComplaintDTO> allComplaints = client.target(baseUri)
                .request(MediaType.APPLICATION_JSON)
                .get(new GenericType<List<ComplaintDTO>>() {});
        allComplaints.forEach(System.out::println);
        System.out.println();

        System.out.println("--- Fetching open complaint with ID 202 ---");
        ComplaintDTO openComplaint = client.target(baseUri + "/202")
                .request(MediaType.APPLICATION_JSON)
                .get(ComplaintDTO.class);
        System.out.println("Fetched: " + openComplaint);
        System.out.println();

        System.out.println("--- Closing complaint with ID 202 ---");
        if (openComplaint != null) {
            openComplaint.setStatus("closed");
            client.target(baseUri + "/202")
                    .request()
                    .put(Entity.json(openComplaint));
            System.out.println("Complaint status changed to 'closed'.");
        }
        System.out.println();

        System.out.println("--- All OPEN complaints (after update) ---");
        List<ComplaintDTO> openComplaintsAfterUpdate = client.target(baseUri)
                .queryParam("status", "open")
                .request(MediaType.APPLICATION_JSON)
                .get(new GenericType<List<ComplaintDTO>>() {});
        openComplaintsAfterUpdate.forEach(System.out::println);
        System.out.println();

        client.close();
    }
}
